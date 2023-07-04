import React, {useEffect, useState} from 'react';
import AlbumEntity from '../../domain/entities/Album.entity';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useConfig} from '../../context/ConfigurationContext';
import TrackEntity from '../../domain/entities/Track.entity';
import {Image} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

interface KDAlbumsTracksListProps {
  style?: StyleProp<ViewStyle> | undefined;
  album: AlbumEntity;
}
const styles = StyleSheet.create({
  container: {},
  listOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
    backgroundColor: 'black',
    opacity: 0.2,
    borderRadius: 16,
  },

  trackContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  trackImage: {width: 48, height: 48},
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
}) => {
  const {getAlbumsTracks} = useConfig();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tracks, setTracks] = useState<TrackEntity[] | null>(null);
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
    }
    setLoading(false);
  };
  const trackRow = (track: TrackEntity) => {
    return (
      <View style={styles.trackContainer}>
        <FastImage
          style={styles.trackImage}
          source={{uri: album.coverSmall}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text numberOfLines={2} style={styles.trackTitle}>
          {track.title}
        </Text>
      </View>
    );
  };
  const containerStyle = style
    ? StyleSheet.flatten([style, styles.container])
    : styles.container;

  useEffect(() => {
    loadAlbumsTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [album]);
  return (
    <View style={containerStyle}>
      <View style={styles.listOverlay} />
      <FlatList
        data={tracks}
        renderItem={({item}: any) => trackRow(item)}
      />
    </View>
  );
};

export default KDAlbumsTracksList;
