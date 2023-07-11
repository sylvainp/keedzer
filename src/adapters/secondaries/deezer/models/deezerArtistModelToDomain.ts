import ArtistEntity from '../../../../domain/entities/Artist.entity';
import DeezerArtistModel from './DeezerArtist.model';

const deezerArtistModelToDomain = (artist: DeezerArtistModel): ArtistEntity => {
  return new ArtistEntity(`${artist.id}`, artist.name);
};

export default deezerArtistModelToDomain;
