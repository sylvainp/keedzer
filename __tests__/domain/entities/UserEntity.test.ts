import UserEntity from '../../../src/domain/entities/UserEntity';

describe('UserEntity', () => {
  it('userEntity getter are ok ', () => {
    expect.assertions(4);
    const user = new UserEntity('1', 'Leponge', 'Bob', 'image_url');
    expect(user.id).toStrictEqual('1');
    expect(user.firstName).toStrictEqual('Bob');
    expect(user.familyName).toStrictEqual('Leponge');
    expect(user.thumbnailUrl).toStrictEqual('image_url');
  });
});
