import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useConfig} from '../../../context/ConfigurationContext';
import KDMainScreenTopbar from '../../components/KDMainScreenTopbar';
import UserEntity from '../../../domain/entities/User.entity';
import KDAlbumsList from '../../components/KDAlbumsList';
import AlbumEntity from '../../../domain/entities/Album.entity';
import {GetAlbumsUsecaseResponse} from '../../../domain/usecases/GetAlbumsUsecase';
import {useAppDispatch} from '../../../store/hooks';
import {setId} from '../../../store/userSlice';
import {Text} from 'react-native-svg';
import {NativeStackParamList} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.color.backgroundColor},
});
const MainScreen: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<NativeStackParamList>>();

  const {getUserInfoUsecase, getAlbumsUsecase} = useConfig();
  const dispatch = useAppDispatch();
  const getUserInfo = async () => {
    const response = await getUserInfoUsecase.execute();
    if (response instanceof UserEntity) {
      dispatch(setId(response.id));
      setUser(response);
    }
  };

  const loadAlbums = async () => {
    if (!user) {
      return;
    }
    const setLoading = currentPage === 0 ? setRefreshing : setLoadingMore;
    setLoading(true);
    try {
      const response: GetAlbumsUsecaseResponse | Error =
        await getAlbumsUsecase.execute(currentPage);
      if (!(response instanceof Error)) {
        const alreadyLoadedAlbum = albums ?? [];

        setAlbums([...alreadyLoadedAlbum, ...response.data]);
        if (response.hasNext) {
          setCanLoadMore(true);
          setCurrentPage(currentPage + 1);
        } else {
          setCanLoadMore(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<UserEntity | null>(null);
  const [albums, setAlbums] = useState<AlbumEntity[] | null>(null);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <View style={styles.root}>
      <KDMainScreenTopbar userInfo={user ?? undefined} />
      <KDAlbumsList
        albums={albums ?? undefined}
        canLoadMore={canLoadMore}
        isLoading={isRefreshing}
        isLoadingMore={isLoadingMore}
        onLoadMore={() => {
          loadAlbums();
        }}
        onAlbumPressed={(album: AlbumEntity, autoPlay: boolean) => {
          navigate('Player', {source: album});
        }}
      />
      {isLoadingMore && <Text>Load more !</Text>}
    </View>
  );
};

export default MainScreen;
