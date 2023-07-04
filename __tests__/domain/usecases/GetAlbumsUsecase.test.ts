import AlbumEntity from '../../../src/domain/entities/Album.entity';
import ArtistEntity from '../../../src/domain/entities/Artist.entity';
import MusicServicePort from '../../../src/domain/ports/MusicServicePort';
import GetAlbumsUsecase, {
  GetAlbumsUsecaseResponse,
} from '../../../src/domain/usecases/GetAlbumsUsecase';
import MusicServiceMockAdapter from '../../mocks/MusicServiceMockAdapter';

describe('GetAlbumsUsecase', () => {
  let mockMusicAdapter: MusicServicePort;
  let usecase: GetAlbumsUsecase;
  beforeAll(() => {
    mockMusicAdapter = new MusicServiceMockAdapter();
    usecase = new GetAlbumsUsecase(mockMusicAdapter);
  });
  it('execute must call getAlbums music service function with params', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockMusicAdapter, 'getAlbums')
      .mockResolvedValue({data: [], hasNext: false});
    await usecase.execute(1);
    expect(mockMusicAdapter.getAlbums).toHaveBeenCalledTimes(1);
    expect(mockMusicAdapter.getAlbums).toHaveBeenCalledWith(1);
  });

  it('execute return data from music service adapter', async () => {
    expect.assertions(3);
    jest.spyOn(mockMusicAdapter, 'getAlbums').mockResolvedValue({
      data: [
        new AlbumEntity(
          '1',
          new ArtistEntity('2', 'artistName'),
          'coverMedium',
          'coverLarge',
          'title',
          'trackUrl',
        ),
      ],
      hasNext: false,
    });
    const result: GetAlbumsUsecaseResponse | Error = await usecase.execute(1);
    expect(result instanceof Error).toBe(false);
    expect((result as GetAlbumsUsecaseResponse).data[0].id).toStrictEqual('1');
    expect((result as GetAlbumsUsecaseResponse).hasNext).toBe(false);
  });

  it('execute return an error when music service throw an error', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockMusicAdapter, 'getAlbums')
      .mockRejectedValue('Unable to get album');
    const result: GetAlbumsUsecaseResponse | Error = await usecase.execute(1);
    expect(result instanceof Error).toBe(true);
    expect(result).toStrictEqual(
      new Error('Une erreur est survenue lors de la récupération des albums'),
    );
  });
});
