import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LogoDeezerSVG} from '../../assets/icons';
import theme from '../theme';

interface KDLoginDeezerButtonProps {
  enabled: boolean;
  onPress: () => void;
}

const disabledOpacity = 0.4;
const styles = StyleSheet.create({
  overlay: {
    opacity: disabledOpacity,
  },
  container: {
    flexDirection: 'row',
    margin: 16,
    borderColor: '#147DD9',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: theme.color.backgroundColor,
    shadowColor: '#147DD9',
    shadowOffset: {width: 1, height: -1},
    shadowOpacity: 1,
    elevation: 8,
  },
  containerPressed: {shadowColor: '#313EB8', borderColor: '#313EB8'},
  image: {
    marginHorizontal: 4,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 8,
    textAlign: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    flex: 1,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.5,
  },
});

const KDLoginDeezerButton: React.FC<KDLoginDeezerButtonProps> = ({
  enabled,
  onPress,
}) => {
  const [isPressed, setPressed] = useState(false);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    isPressed && enabled ? styles.containerPressed : undefined,
  ]);
  const pressabledStyle = !enabled && styles.overlay;
  return (
    <TouchableOpacity
      style={pressabledStyle}
      activeOpacity={enabled ? 1 : disabledOpacity}
      onPress={() => {
        enabled && onPress();
      }}
      onPressIn={() => enabled && setPressed(true)}
      onPressOut={() => enabled && setPressed(false)}>
      <View style={containerStyle}>
        <LogoDeezerSVG width={64} height={64} style={styles.image} />
        <Text style={styles.text}>Se connecter avec Deezer</Text>
      </View>
    </TouchableOpacity>
  );
};
export default KDLoginDeezerButton;
