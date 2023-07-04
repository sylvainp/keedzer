import TrackEntity from '../../../src/domain/entities/Track.entity';

describe('TrackEntity', () => {
  it('track entity getter are ok', () => {
    expect.assertions(5);
    const track = new TrackEntity('1', 233, 1, 'https://', 'title');
    expect(track.id).toStrictEqual('1');
    expect(track.duration).toStrictEqual(233);
    expect(track.position).toStrictEqual(1);
    expect(track.previewUrl).toStrictEqual('https://');
    expect(track.title).toStrictEqual('title');
  });
});
