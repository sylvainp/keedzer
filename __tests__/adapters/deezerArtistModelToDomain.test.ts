import DeezerArtistModel from '../../src/adapters/secondaries/deezer/models/DeezerArtist.model';
import deezerArtistModelToDomain from '../../src/adapters/secondaries/deezer/models/deezerArtistModelToDomain';
import ArtistEntity from '../../src/domain/entities/Artist.entity';

describe('deezerArtistModelToDomain', () => {
  it('function create entity from deezer model', () => {
    expect.assertions(2);
    const artistJson: DeezerArtistModel = {
      id: 415,
      name: 'Nirvana',
      picture: 'https://api.deezer.com/artist/415/image',
      picture_small:
        'https://e-cdns-images.dzcdn.net/images/artist/3ec5542ff520ee74e2befdaba32ef2ef/56x56-000000-80-0-0.jpg',
      picture_medium:
        'https://e-cdns-images.dzcdn.net/images/artist/3ec5542ff520ee74e2befdaba32ef2ef/250x250-000000-80-0-0.jpg',
      picture_big:
        'https://e-cdns-images.dzcdn.net/images/artist/3ec5542ff520ee74e2befdaba32ef2ef/500x500-000000-80-0-0.jpg',
      picture_xl:
        'https://e-cdns-images.dzcdn.net/images/artist/3ec5542ff520ee74e2befdaba32ef2ef/1000x1000-000000-80-0-0.jpg',
      tracklist: 'https://api.deezer.com/artist/415/top?limit=50',
      type: 'artist',
    };
    const artistEntity: ArtistEntity = deezerArtistModelToDomain(artistJson);
    expect(artistEntity.id).toStrictEqual(`${artistJson.id}`);
    expect(artistEntity.name).toStrictEqual(`${artistJson.name}`);
  });
});
