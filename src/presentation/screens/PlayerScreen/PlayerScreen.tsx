import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import React = require('react');
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../../navigation/types';
import KDPlayerController from '../../components/KDPlayerController';
import KDAlbumsTracksList from '../../components/KDAlbumsTracksList';
import KDPlayerScreenTopbar from '../../components/KDPlayerScreenTopbar';
import {useNavigation} from '@react-navigation/native';
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
      <KDAlbumsTracksList album={source} style={tracksListStyle} />
      <KDPlayerController
        style={styles.controller}
        onPlay={() => {
          console.log('onPlay');
        }}
        onPause={() => {
          console.log('onPause');
        }}
        onBack={() => {
          console.log('onBack');
        }}
        onForward={() => {
          console.log('onForward');
        }}
      />
    </View>
  );
};

export default PlayerScreen;
