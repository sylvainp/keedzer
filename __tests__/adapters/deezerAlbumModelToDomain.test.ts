import DeezerAlbumModel from '../../src/adapters/secondaries/deezer/models/DeezerAlbum.model';
import deezerAlbumModelToDomain from '../../src/adapters/secondaries/deezer/models/deezerAlbumModelToDomain';
import deezerArtistModelToDomain from '../../src/adapters/secondaries/deezer/models/deezerArtistModelToDomain';
import AlbumEntity from '../../src/domain/entities/Album.entity';

describe('deezerAlbumModelToDomain', () => {
  it('function create entity from deezer model', () => {
    expect.assertions(6);
    const albumJson: DeezerAlbumModel = {
      id: 1262050,
      title: 'Nevermind',
      link: 'https://www.deezer.com/album/1262050',
      cover: 'https://api.deezer.com/album/1262050/image',
      cover_small:
        'https://e-cdns-images.dzcdn.net/images/cover/d4caa8cbf826cb0c9b885800604904c1/56x56-000000-80-0-0.jpg',
      cover_medium:
        'https://e-cdns-images.dzcdn.net/images/cover/d4caa8cbf826cb0c9b885800604904c1/250x250-000000-80-0-0.jpg',
      cover_big:
        'https://e-cdns-images.dzcdn.net/images/cover/d4caa8cbf826cb0c9b885800604904c1/500x500-000000-80-0-0.jpg',
      cover_xl:
        'https://e-cdns-images.dzcdn.net/images/cover/d4caa8cbf826cb0c9b885800604904c1/1000x1000-000000-80-0-0.jpg',
      md5_image: 'd4caa8cbf826cb0c9b885800604904c1',
      nb_tracks: 43,
      release_date: '2011-10-04',
      record_type: 'album',
      available: false,
      tracklist: 'https://api.deezer.com/album/1262050/tracks',
      explicit_lyrics: false,
      time_add: 1446654095,
      artist: {
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
      },
      type: 'album',
    };
    const albumEntity: AlbumEntity = deezerAlbumModelToDomain(albumJson);
    expect(albumEntity.id).toStrictEqual(`${albumJson.id}`);
    expect(albumEntity.title).toStrictEqual(albumJson.title);
    expect(albumEntity.tracksUrl).toStrictEqual(albumJson.tracklist);
    expect(albumEntity.coverLarge).toStrictEqual(albumJson.cover_big);
    expect(albumEntity.coverMedium).toStrictEqual(albumJson.cover_medium);
    expect(albumEntity.artist).toStrictEqual(
      deezerArtistModelToDomain(albumJson.artist),
    );
  });
});
