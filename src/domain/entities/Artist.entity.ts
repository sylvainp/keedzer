export default class ArtistEntity {
  constructor(private readonly _id: string, private readonly _name: string) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
