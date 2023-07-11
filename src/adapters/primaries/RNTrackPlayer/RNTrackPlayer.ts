import {PlayerPort, PlayerTrack} from '../../../domain/ports/PlayerPort';
import TrackPlayer, {Event, State, Track} from 'react-native-track-player';

class RNTrackPlayer implements PlayerPort {
  private _ready = false;
  private _playPauseListener: Map<string, (isPlaying: boolean) => void> =
    new Map();
  private _trackChangedListener: Map<string, (currentTrackId: string) => void> =
    new Map();

  constructor() {
    console.log('RNTrackPlayer.constructor');
    TrackPlayer.addEventListener(Event.PlaybackState, state => {
      console.log({state});
      if (
        this._playPauseListener !== undefined &&
        (state.state === State.Paused || state.state === State.Playing)
      ) {
        this._playPauseListener.forEach((listener, _key) =>
          listener(state.state === State.Playing),
        );
      }
    });

    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
      console.log('Event.PlaybackTrackChanged', {event});
      if (this._trackChangedListener !== undefined) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        if (track !== null) {
          this._trackChangedListener.forEach((listener, _key) =>
            listener(track!.id),
          );
        }
      }
    });
  }
  addPlayPauseListener(
    key: string,
    listener: (isPlaying: boolean) => void,
  ): void {
    this._playPauseListener.set(key, listener);
  }
  removePlayPauseListener(key: string): void {
    this._playPauseListener.delete(key);
  }

  addTrackChangedListener(
    key: string,
    listener: (currentTrackId: string) => void,
  ): void {
    this._trackChangedListener.set(key, listener);
  }
  removeTrackChangedListener(key: string): void {
    this._trackChangedListener.delete(key);
  }
  async prepare(): Promise<void> {
    await TrackPlayer.setupPlayer();
    this._ready = true;
  }

  async play(): Promise<void> {
    if (!this._ready) {
      await this.prepare();
    }
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error({error});
    }
  }

  async pause(): Promise<void> {
    if (this._ready) {
      await TrackPlayer.pause();
    }
  }
  async previousTrack(): Promise<void> {
    if (this._ready) {
      await TrackPlayer.skipToPrevious();
    }
  }
  async nextTrack(): Promise<void> {
    if (this._ready) {
      await TrackPlayer.skipToNext();
    }
  }
  async addTrack(track: PlayerTrack): Promise<void> {
    if (this._ready) {
      await TrackPlayer.reset();
      await TrackPlayer.add(this.toRNTrack(track));
    }
  }
  async addTracks(tracks: PlayerTrack[]): Promise<void> {
    if (this._ready) {
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks.map(item => this.toRNTrack(item)));
    }
  }
  async isPlaying(): Promise<boolean> {
    if (this._ready) {
      const state = await TrackPlayer.getState();
      return state === State.Playing;
    } else {
      return false;
    }
  }

  private toRNTrack(track: PlayerTrack): Track {
    return {
      id: track.id,
      artist: track.artist,
      artwork: track.imageUrl,
      duration: track.duration,
      title: track.title,
      url: track.url,
    };
  }
}
export default RNTrackPlayer;
