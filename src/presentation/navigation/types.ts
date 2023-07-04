import AlbumEntity from '../../domain/entities/Album.entity';

export type NativeStackParamList = {
  Login: undefined;
  Main: undefined;
  Player: {source: AlbumEntity};
};
