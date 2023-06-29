export default class UserEntity {
  constructor(
    private readonly _id: string,
    private readonly _familyName: string,
    private readonly _firstName: string,
    private readonly _thumbnailUrl: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get familyName(): string {
    return this._familyName;
  }
  get firstName(): string {
    return this._firstName;
  }
  get thumbnailUrl(): string {
    return this._thumbnailUrl;
  }
}
