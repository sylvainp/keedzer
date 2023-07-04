import DeezerUserModel from '../../src/adapters/deezer/models/DeezerUser.model';
import deezerUserModelToDomain from '../../src/adapters/deezer/models/deezerUserModelToDomain';

describe('deezerUserModelToDomain', () => {
  it('function create entity from deezer model', () => {
    expect.assertions(4);
    const userJson: DeezerUserModel = {
      id: 15924234,
      name: 'poutch',
      lastname: 'Puccinelli',
      firstname: 'Sylvain',
      email: 'puccinelli.sylvain@gmail.com',
      status: 2,
      birthday: '0000-00-00',
      inscription_date: '2011-01-22',
      gender: '',
      link: 'https://www.deezer.com/profile/15924234',
      picture: 'https://api.deezer.com/user/15924234/image',
      picture_small:
        'https://e-cdns-images.dzcdn.net/images/user/1630b10cc74b44c4b4995d5843098d14/56x56-000000-80-0-0.jpg',
      picture_medium:
        'https://e-cdns-images.dzcdn.net/images/user/1630b10cc74b44c4b4995d5843098d14/250x250-000000-80-0-0.jpg',
      picture_big:
        'https://e-cdns-images.dzcdn.net/images/user/1630b10cc74b44c4b4995d5843098d14/500x500-000000-80-0-0.jpg',
      picture_xl:
        'https://e-cdns-images.dzcdn.net/images/user/1630b10cc74b44c4b4995d5843098d14/1000x1000-000000-80-0-0.jpg',
      country: 'FR',
      lang: 'fr',
      is_kid: false,
      explicit_content_level: 'explicit_display',
      explicit_content_levels_available: [
        'explicit_display',
        'explicit_no_recommendation',
        'explicit_hide',
      ],
      tracklist: 'https://api.deezer.com/user/15924234/flow',
      type: 'user',
    };
    const userEntity = deezerUserModelToDomain(userJson);
    expect(userEntity.id).toStrictEqual(`${userJson.id}`);
    expect(userEntity.thumbnailUrl).toStrictEqual(userJson.picture_small);
    expect(userEntity.firstName).toStrictEqual(userJson.firstname);
    expect(userEntity.familyName).toStrictEqual(userJson.lastname);
  });
});
