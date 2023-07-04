import UserEntity from '../../../domain/entities/User.entity';
import DeezerUserModel from './DeezerUser.model';

const deezerUserModelToDomain = (userModel: DeezerUserModel): UserEntity => {
  return new UserEntity(
    `${userModel.id}`,
    userModel.lastname ?? 'N/C',
    userModel.firstname ?? 'N/C',
    userModel.picture_small ?? 'N/C',
  );
};
export default deezerUserModelToDomain;
