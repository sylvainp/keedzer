import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useConfig} from '../../../context/ConfigurationContext';
import KDMainScreenTopbar from '../../components/KDMainScreenTopbar';
import UserEntity from '../../../domain/entities/UserEntity';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'red'},
});
const MainScreen: React.FC = () => {
  const {getUserInfoUsecase} = useConfig();
  const getUserInfo = async () => {
    const response = await getUserInfoUsecase.execute();
    if (response instanceof UserEntity) {
      setUser(response);
    }
  };
  const [user, setUser] = useState<UserEntity | null>(null);

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <KDMainScreenTopbar userInfo={user ?? undefined} />
    </View>
  );
};

export default MainScreen;
