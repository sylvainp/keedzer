import ArtistEntity from './Artist.entity';

export default class AlbumEntity {
  constructor(
    private readonly _id: string,
    private readonly _artist: ArtistEntity,
    private readonly _coverMedium: string,
    private readonly _coverLarge: string,
    private readonly _title: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get artist(): ArtistEntity {
    return this._artist;
  }

  get coverMedium(): string {
    return this._coverMedium;
  }

  get coverLarge(): string {
    return this._coverLarge;
  }

  get title(): string {
    return this._title;
  }
}
