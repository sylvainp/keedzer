import ArtistEntity from '../../../src/domain/entities/Artist.entity';

describe('ArtistEntity', () => {
  it('ArtisEntity getter are ok', () => {
    expect.assertions(2);
    const artist = new ArtistEntity('2', 'artist_name');

    expect(artist.id).toStrictEqual('2');
    expect(artist.name).toStrictEqual('artist_name');
  });
});
