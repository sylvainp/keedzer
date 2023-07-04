import React from 'react';
import AlbumEntity from '../../domain/entities/Album.entity';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PlayButtonSVG} from '../../assets/icons';
import theme from '../theme';

interface KDAlbumCardProps {
  album: AlbumEntity;
  dimension: number;
  onAlbumPress: (album: AlbumEntity, autoplay: boolean) => void;
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    padding: 8,
  },
  itemImage: {width: '100%', height: '100%', borderRadius: 16},
  itemTitle: {marginLeft: 8, textAlign: 'left', fontSize: 18},
  payButtonContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: theme.color.backgroundColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0,
  },
});
const KDAlbumCard: React.FC<KDAlbumCardProps> = ({
  album,
  dimension,
  onAlbumPress,
}) => {
  const containerStyle = StyleSheet.flatten([
    styles.itemContainer,
    {width: dimension, height: dimension},
  ]);
  return (
    <TouchableHighlight onPress={() => onAlbumPress(album, false)}>
      <View style={containerStyle}>
        <FastImage
          style={styles.itemImage}
          source={{
            uri: album.coverMedium,
          }}
          resizeMode={FastImage.resizeMode.contain}
          defaultSource={require('../../assets/icons/music-placeholder.png')}
        />
        <TouchableHighlight
          style={styles.payButtonContainer}
          onPress={() => onAlbumPress(album, true)}>
          <PlayButtonSVG width={40} height={40} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};
export default KDAlbumCard;
