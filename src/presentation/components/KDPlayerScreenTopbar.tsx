import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BackSVG} from '../../assets/icons';
import theme from '../theme';
interface KDPlayerScreenTopbarProps {
  height: number;
  title: string;
  onBackPressed: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    shadowColor: 'red',
  },
  containerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.color.backgroundColor,
    opacity: 0.3,
  },
  title: {
    color: 'white',
    fontSize: 28,
    flex: 1,
    marginLeft: 16,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
});
const KDPlayerScreenTopbar: React.FC<KDPlayerScreenTopbarProps> = ({
  title,
  height,
  onBackPressed,
}) => {
  const containerStyle = StyleSheet.flatten([styles.container, {height}]);
  const containerOverlayStyle = StyleSheet.flatten([
    styles.containerOverlay,
    {height},
  ]);
  return (
    <View style={containerStyle}>
      <View style={containerOverlayStyle} />
      <TouchableOpacity onPress={onBackPressed}>
        <BackSVG width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};
export default KDPlayerScreenTopbar;
