import React from 'react';
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
const KDPlayerController: React.FC<KDPlayerControllerProps> = ({style}) => {
  const [isPlaying, setPlaying] = React.useState(false);
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
  return (
    <View style={containerStyle}>
      <View style={containerOverlayStyle} />
      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <PlayerBackSVG width={60} height={60} />
      </TouchableOpacity>
      <View style={styles.playPauseOverlay} />
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => setPlaying(!isPlaying)}>
        {isPlaying ? (
          <PlayerPauseSVG width={60} height={60} />
        ) : (
          <PlayerPlaySVG width={60} height={60} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <PlayerForwardSVG width={60} height={60} />
      </TouchableOpacity>
    </View>
  );
};

export default KDPlayerController;
