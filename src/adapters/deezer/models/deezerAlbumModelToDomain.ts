import AlbumEntity from '../../../domain/entities/Album.entity';
import DeezerAlbumModel from './DeezerAlbum.model';
import deezerArtistModelToDomain from './deezerArtistModelToDomain';

const deezerAlbumModelToDomain = (model: DeezerAlbumModel): AlbumEntity => {
  return new AlbumEntity(
    `${model.id}`,
    deezerArtistModelToDomain(model.artist),
    model.cover_medium,
    model.cover_big,
    model.cover_small,
    model.title,
    model.tracklist,
  );
};

export default deezerAlbumModelToDomain;
