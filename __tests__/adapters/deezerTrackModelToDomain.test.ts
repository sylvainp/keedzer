import DeezerTrackModel from '../../src/adapters/secondaries/deezer/models/DeezerTrack.model';
import deezerTrackModelToDomain from '../../src/adapters/secondaries/deezer/models/deezerTrackModelToDomain';

describe('deezerTrackModelToDomain', () => {
  it('create entity from model', () => {
    expect.assertions(5);
    const trackJson: DeezerTrackModel = {
      id: 137040184,
      readable: true,
      title: 'La voix de grand magasin 1',
      title_short: 'La voix de grand magasin 1',
      title_version: '',
      isrc: 'FR0JV0580010',
      link: 'https://www.deezer.com/track/137040184',
      duration: 114,
      track_position: 1,
      disk_number: 1,
      rank: 397585,
      explicit_lyrics: false,
      explicit_content_lyrics: 0,
      explicit_content_cover: 2,
      preview:
        'https://cdns-preview-d.dzcdn.net/stream/c-dc629c3d1d88b1aa415f95866a013933-6.mp3',
      md5_image: '6135b7ec07215fd63270ceea2f3cff9e',
      type: 'track',
    };
    const trackEntity = deezerTrackModelToDomain(trackJson);
    expect(trackEntity.id).toStrictEqual(`${trackJson.id}`);
    expect(trackEntity.title).toStrictEqual(trackJson.title);
    expect(trackEntity.duration).toStrictEqual(trackJson.duration);
    expect(trackEntity.position).toStrictEqual(trackJson.track_position);
    expect(trackEntity.previewUrl).toStrictEqual(trackJson.preview);
  });
});
