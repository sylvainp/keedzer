import React from 'react';
import {FlatList, Text, StyleSheet, View, Dimensions} from 'react-native';
import AlbumEntity from '../../domain/entities/Album.entity';
import FastImage from 'react-native-fast-image';
import KDAlbumCard from './KDAlbumCard';
import theme from '../theme';

export interface KDAlbumsListProps {
  albums?: AlbumEntity[];
  canLoadMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onAlbumPressed: (album: AlbumEntity, autoPlay: boolean) => void;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.color.backgroundColor,
  },

  itemContainer: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemImage: {width: 100, height: 100},
  itemTitle: {marginLeft: 8, textAlign: 'left', fontSize: 18},
});

const KDAlbumsList: React.FC<KDAlbumsListProps> = ({
  albums,
  canLoadMore,
  isLoading,
  isLoadingMore,
  onLoadMore,
  onAlbumPressed,
}) => {
  const handleLoadMore = () => {
    if (!isLoading && !isLoadingMore && canLoadMore) {
      onLoadMore();
    }
  };
  const dimension = Dimensions.get('screen');
  const cardDimension = dimension.width * 0.5;
  return (
    <FlatList
      style={styles.list}
      data={albums}
      numColumns={2}
      keyExtractor={item => item.id}
      renderItem={({item}: any) => (
        <KDAlbumCard
          album={item}
          dimension={cardDimension}
          onAlbumPress={onAlbumPressed}
        />
      )}
      onEndReachedThreshold={0.4}
      onEndReached={_info => {
        handleLoadMore();
      }}
    />
  );
};
export default KDAlbumsList;
