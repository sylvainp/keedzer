/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AlbumEntity from '../../domain/entities/Album.entity';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useConfig} from '../../context/ConfigurationContext';
import TrackEntity from '../../domain/entities/Track.entity';
import FastImage from 'react-native-fast-image';
import theme from '../theme';
import {ErrorSVG, PlayButtonSVG} from '../../assets/icons';

interface KDAlbumsTracksListProps {
  style?: StyleProp<ViewStyle> | undefined;
  album: AlbumEntity;
  onTrackPressed: (track: TrackEntity) => void;
  onTrackLoaded: (tracks: TrackEntity[]) => void;
}
const styles = StyleSheet.create({
  container: {},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  errorMessage: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  listOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
    backgroundColor: theme.color.backgroundColor,
    opacity: 0.3,
    borderRadius: 16,
  },

  trackContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  trackImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackImage: {width: 48, height: 48},
  trackPlaying: {position: 'absolute'},
  trackTitle: {
    color: 'white',
    fontSize: 24,
    marginLeft: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
});
const KDAlbumsTracksList: React.FC<KDAlbumsTracksListProps> = ({
  album,
  style,
  onTrackPressed,
  onTrackLoaded,
}) => {
  const {getAlbumsTracks, playerService} = useConfig();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tracks, setTracks] = useState<TrackEntity[] | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const loadAlbumsTracks = async () => {
    setLoading(true);
    const result: TrackEntity[] | Error = await getAlbumsTracks.execute(
      album.id,
    );
    if (result instanceof Error) {
      setError(result);
      setTracks(null);
    } else {
      setError(null);
      setTracks(result);
      onTrackLoaded(result);
    }
    setLoading(false);
  };
  const trackRow = (track: TrackEntity) => {
    return (
      <TouchableOpacity
        style={styles.trackContainer}
        onPress={() => {
          onTrackPressed(track);
        }}>
        <View style={styles.trackImageContainer}>
          <FastImage
            style={styles.trackImage}
            source={{uri: album.coverSmall}}
            resizeMode={FastImage.resizeMode.contain}
          />
          {track.id === currentTrackId && (
            <PlayButtonSVG style={styles.trackPlaying} width={20} height={20} />
          )}
        </View>
        <Text numberOfLines={2} style={styles.trackTitle}>
          {track.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const containerStyle = style
    ? StyleSheet.flatten([style, styles.container])
    : styles.container;

  useEffect(() => {
    const key = 'albumlist';
    playerService.addPlayPauseListener(key, isPlaying => {
      if (!isPlaying) {
        setCurrentTrackId(null);
      }
    });
    playerService.addTrackChangedListener(key, trackId => {
      setCurrentTrackId(trackId);
    });
    return () => {
      playerService.removePlayPauseListener(key);
      playerService.removeTrackChangedListener(key);
    };
  }, []);

  useEffect(() => {
    loadAlbumsTracks();
  }, [album]);
  return (
    <View style={containerStyle}>
      <View style={styles.listOverlay} />
      {tracks && (
        <FlatList data={tracks} renderItem={({item}: any) => trackRow(item)} />
      )}
      {error && (
        <View style={styles.errorContainer}>
          <ErrorSVG width={200} height={200} color={'#FFF'} />
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      )}
    </View>
  );
};

export default KDAlbumsTracksList;
