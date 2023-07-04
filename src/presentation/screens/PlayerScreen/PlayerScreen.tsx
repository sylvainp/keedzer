import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import React = require('react');
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../../navigation/types';
import KDPlayerController from '../../components/KDPlayerController';
import KDAlbumsTracksList from '../../components/KDAlbumsTracksList';
type PlayerScreenProps = NativeStackScreenProps<NativeStackParamList, 'Player'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    bottom: 50,
    left: 16,
    right: 16,
    height: 200,
  },
});
const PlayerScreen = ({
  route: {
    params: {source},
  },
}: PlayerScreenProps) => {
  const screenDimension = useWindowDimensions();
  const trackListHeight = screenDimension.height - 250 - 25;
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
