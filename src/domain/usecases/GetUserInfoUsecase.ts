import UserEntity from '../entities/User.entity';
import MusicServicePort from '../ports/MusicServicePort';

export default class GetUserInfoUsecase {
  constructor(private readonly musicService: MusicServicePort) {}

  async execute(): Promise<UserEntity | Error> {
    try {
      const result = await this.musicService.getUserInfo();
      return result;
    } catch (error) {
      //   console.error('GetUserInfoUsecase', {error});
      return new Error(
        'Une erreur est survenue lors de la récupération des informations',
      );
    }
  }
}
