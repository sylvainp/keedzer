import AlbumEntity from '../entities/Album.entity';
import MusicServicePort from '../ports/MusicServicePort';

export type GetAlbumsUsecaseResponse = {
  data: AlbumEntity[];
  hasNext: boolean;
};
export default class GetAlbumsUsecase {
  constructor(private readonly musicService: MusicServicePort) {}

  async execute(pageIndex: number): Promise<GetAlbumsUsecaseResponse | Error> {
    try {
      const response: {data: AlbumEntity[]; hasNext: boolean} | Error =
        await this.musicService.getAlbums(pageIndex);
      return {data: response.data, hasNext: response.hasNext};
    } catch (error) {
      return new Error(
        'Une erreur est survenue lors de la récupération des albums',
      );
    }
  }
}
