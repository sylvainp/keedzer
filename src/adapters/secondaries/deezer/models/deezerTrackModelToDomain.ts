import TrackEntity from '../../../../domain/entities/Track.entity';
import DeezerTrackModel from './DeezerTrack.model';

const deezerTrackModelToDomain = (track: DeezerTrackModel): TrackEntity => {
  return new TrackEntity(
    `${track.id}`,
    track.duration,
    track.track_position,
    track.preview,
    track.title,
  );
};
export default deezerTrackModelToDomain;
