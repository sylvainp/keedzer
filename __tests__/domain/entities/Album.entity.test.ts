import AlbumEntity from '../../../src/domain/entities/Album.entity';
import ArtistEntity from '../../../src/domain/entities/Artist.entity';

describe('AlbumEntity', () => {
  it('AlbumEntity getter are ok', () => {
    expect.assertions(5);
    const artist = new ArtistEntity('2', 'artist_name');
    const album = new AlbumEntity(
      '1',
      artist,
      'cover_medium',
      'cover_large',
      'title',
    );
    expect(album.id).toStrictEqual('1');
    expect(album.artist).toStrictEqual(artist);
    expect(album.coverMedium).toStrictEqual('cover_medium');
    expect(album.coverLarge).toStrictEqual('cover_large');
    expect(album.title).toStrictEqual('title');
  });
});
