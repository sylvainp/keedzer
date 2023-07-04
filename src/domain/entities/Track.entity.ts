class TrackEntity {
  constructor(
    private readonly _id: string,
    private readonly _duration: number,
    private readonly _position: number,
    private readonly _previewUrl: string,
    private readonly _title: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get duration(): number {
    return this._duration;
  }

  get position(): number {
    return this._position;
  }

  get previewUrl(): string {
    return this._previewUrl;
  }
  get title(): string {
    return this._title;
  }
}

export default TrackEntity;
