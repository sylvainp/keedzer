export interface PlayerPort {
  prepare(): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  previousTrack(): Promise<void>;
  nextTrack(): Promise<void>;
  addTrack(track: PlayerTrack): Promise<void>;
  addTracks(tracks: PlayerTrack[]): Promise<void>;
  isPlaying(): Promise<boolean>;
  addPlayPauseListener(
    key: string,
    listener: (isPlaying: boolean) => void,
  ): void;
  removePlayPauseListener(key: string): void;
  addTrackChangedListener(
    key: string,
    listener: (currentTrackId: string) => void,
  ): void;
  removeTrackChangedListener(key: string): void;
}
export interface PlayerTrack {
  id: string;
  artist: string;
  duration: number;
  imageUrl: string;
  title: string;
  url: string;
}
