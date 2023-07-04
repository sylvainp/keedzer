import TrackEntity from '../entities/Track.entity';
import MusicServicePort from '../ports/MusicServicePort';

class GetAlbumsTracks {
  constructor(private readonly adapter: MusicServicePort) {}

  async execute(albumId: string): Promise<TrackEntity[] | Error> {
    try {
      const response: TrackEntity[] = await this.adapter.getAlbumTracks(
        albumId,
      );
      return response;
    } catch (erreur) {
      console.error({erreur});
      return new Error(
        'Une erreur est survenue lors de la récupération des pistes',
      );
    }
  }
}

export default GetAlbumsTracks;
