import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import UserEntity from '../../domain/entities/User.entity';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.backgroundColor,
    height: 60,
    padding: 8,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    marginLeft: 16,
    color: 'white',
  },
  image: {
    borderColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    height: 48,
    width: 48,
  },
});
interface KDMainScreeTopbarProps {
  userInfo?: UserEntity;
}
const KDMainScreenTopbar: React.FC<KDMainScreeTopbarProps> = ({userInfo}) => {
  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.content}>
          <Image style={styles.image} source={{uri: userInfo!.thumbnailUrl}} />
          <Text style={styles.title}>Bonjour {userInfo!.firstName} !</Text>
        </View>
      )}
    </View>
  );
};

export default KDMainScreenTopbar;
