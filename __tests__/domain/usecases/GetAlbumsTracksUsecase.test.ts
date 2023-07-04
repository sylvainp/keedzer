import TrackEntity from '../../../src/domain/entities/Track.entity';
import MusicServicePort from '../../../src/domain/ports/MusicServicePort';
import GetAlbumsTracks from '../../../src/domain/usecases/GetAlbumsTracks';
import MusicServiceMockAdapter from '../../mocks/MusicServiceMockAdapter';

describe('GetAlbumsTracks', () => {
  let mockMusicAdapter: MusicServicePort;
  let usecase: GetAlbumsTracks;
  const albumId = '6';
  beforeAll(() => {
    mockMusicAdapter = new MusicServiceMockAdapter();
    usecase = new GetAlbumsTracks(mockMusicAdapter);
  });

  it('execute function must call getAlbumTracks port function with params', async () => {
    expect.assertions(2);
    jest.spyOn(mockMusicAdapter, 'getAlbumTracks').mockResolvedValue([]);
    usecase.execute(albumId);
    expect(mockMusicAdapter.getAlbumTracks).toHaveBeenCalledTimes(1);
    expect(mockMusicAdapter.getAlbumTracks).toHaveBeenCalledWith(albumId);
  });

  it('execute function must return TrackEntity returned by adapter', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockMusicAdapter, 'getAlbumTracks')
      .mockResolvedValue([
        new TrackEntity('1', 1, 1, 'url', 'title'),
        new TrackEntity('2', 2, 2, 'url2', 'title2'),
      ]);
    const response: TrackEntity[] | Error = await usecase.execute(albumId);
    expect(response instanceof Array).toBe(true);
    expect((response as TrackEntity[]).length).toStrictEqual(2);
  });

  it('execute function must return an error if adapter throw an error', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockMusicAdapter, 'getAlbumTracks')
      .mockRejectedValue(new Error('an error occurred'));
    const response: TrackEntity[] | Error = await usecase.execute(albumId);
    expect(response instanceof Error).toBe(true);
    expect(response).toEqual(
      new Error('Une erreur est survenue lors de la récupération des pistes'),
    );
  });
});
