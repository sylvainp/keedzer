import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import React = require('react');
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../../navigation/types';
import KDPlayerController from '../../components/KDPlayerController';
import KDAlbumsTracksList from '../../components/KDAlbumsTracksList';
import KDPlayerScreenTopbar from '../../components/KDPlayerScreenTopbar';
import {useNavigation} from '@react-navigation/native';
import {useConfig} from '../../../context/ConfigurationContext';
import TrackEntity from '../../../domain/entities/Track.entity';

type PlayerScreenProps = NativeStackScreenProps<NativeStackParamList, 'Player'>;

const controllerHeight = 200;
const controllerPadding = 16;
const topbarHeight = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tracksList: {padding: 24},
  controller: {
    position: 'absolute',
    bottom: controllerPadding,
    left: controllerPadding,
    right: controllerPadding,
    height: controllerHeight,
  },
});
const PlayerScreen = ({
  route: {
    params: {source},
  },
}: PlayerScreenProps) => {
  const screenDimension = useWindowDimensions();
  const navigation = useNavigation();
  const {playerService} = useConfig();
  const trackListHeight =
    screenDimension.height -
    controllerHeight -
    controllerPadding -
    topbarHeight -
    25;
  const tracksListStyle = StyleSheet.flatten([
    styles.tracksList,
    {height: trackListHeight, width: screenDimension.width},
  ]);

  let albumTracks: TrackEntity[] | undefined;
  const onTrackPressed = async (track: TrackEntity) => {
    console.log('onTrackPressed', {track});
    await playerService.addTrack({
      id: track.id,
      artist: source.artist.name,
      duration: track.duration,
      imageUrl: source.coverMedium,
      title: track.title,
      url: track.previewUrl,
    });
    playerService.play();
  };
  const onPlayAlbum = async (tracks: TrackEntity[]) => {
    console.log('start playing ' + source.title);
    await playerService.addTracks(
      tracks.map(item => {
        return {
          id: item.id,
          artist: source.artist.name,
          duration: item.duration,
          imageUrl: source.coverMedium,
          title: item.title,
          url: item.previewUrl,
        };
      }),
    );
    playerService.play();
  };
  console.log(
    'PlayerScreen',
    `albumTracks.count=${albumTracks ? albumTracks.length : 'undefined'}`,
  );
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        resizeMode="cover"
        source={{uri: source.coverLarge}}
        blurRadius={4}
      />
      <KDPlayerScreenTopbar
        title={source.title}
        height={topbarHeight}
        onBackPressed={() => navigation.goBack()}
      />
      <KDAlbumsTracksList
        album={source}
        style={tracksListStyle}
        onTrackPressed={onTrackPressed}
        onTrackLoaded={(tracks: TrackEntity[]) => {
          console.log('onTrackLoaded');
          albumTracks = tracks;
        }}
      />
      <KDPlayerController
        style={styles.controller}
        onPlay={async () => {
          if (albumTracks !== undefined) {
            onPlayAlbum(albumTracks);
          } else {
            console.warn(`Cannot play ${source.title}`);
          }
        }}
        onPause={() => {
          playerService.pause();
        }}
        onBack={() => {
          playerService.previousTrack();
        }}
        onForward={() => {
          playerService.nextTrack();
        }}
      />
    </View>
  );
};

export default PlayerScreen;
