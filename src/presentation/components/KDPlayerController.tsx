/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  PlayerBackSVG,
  PlayerForwardSVG,
  PlayerPauseSVG,
  PlayerPlaySVG,
} from '../../assets/icons';
import theme from '../theme';
import {useConfig} from '../../context/ConfigurationContext';

interface KDPlayerControllerProps {
  style: StyleProp<ViewStyle> | undefined;
  onPlay: () => void;
  onPause: () => void;
  onForward: () => void;
  onBack: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOverlay: {
    backgroundColor: theme.color.backgroundColor,
    opacity: 0.3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    overflow: 'hidden',
  },

  playPauseOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.4,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
const KDPlayerController: React.FC<KDPlayerControllerProps> = ({
  onBack,
  onForward,
  onPause,
  onPlay,
  style,
}) => {
  const [isPlaying, setPlaying] = useState(false);
  const {playerService} = useConfig();

  const expectedHeight = (style as any).height ?? 180;
  const containerStyle = StyleSheet.flatten([
    styles.container,
    style,
    {height: expectedHeight},
  ]);
  const containerOverlayStyle = StyleSheet.flatten([
    styles.containerOverlay,
    {height: expectedHeight},
  ]);

  useEffect(() => {
    const key = 'playercontroller';
    playerService.addPlayPauseListener(key, (playing: boolean) =>
      setPlaying(playing),
    );

    return () => {
      playerService.removePlayPauseListener(key);
    };
  }, []);
  return (
    <View style={containerStyle}>
      <View style={containerOverlayStyle} />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={onBack}>
        <PlayerBackSVG width={60} height={60} />
      </TouchableOpacity>
      <View style={styles.playPauseOverlay} />
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => {
          isPlaying ? onPause() : onPlay();
        }}>
        {isPlaying ? (
          <PlayerPauseSVG width={60} height={60} />
        ) : (
          <PlayerPlaySVG width={60} height={60} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={onForward}>
        <PlayerForwardSVG width={60} height={60} />
      </TouchableOpacity>
    </View>
  );
};

export default KDPlayerController;
