import { CreateNodecgInstance, CreateNodecgConstructor } from 'ts-nodecg/browser';
import { SpotifyPlayingContext } from './external/nodecg-spotify-widget/spotifyPlayingContext';
import { SpotifyPlayingTrack } from './external/nodecg-spotify-widget/spotifyPlayingTrack';

export type spotifyWidgetInstance = CreateNodecgInstance<
  'nodecg-spotify-widget',
  {},
  {
    spotifyPlayingContext: SpotifyPlayingContext,
    spotifyPlayingTrack: SpotifyPlayingTrack
  },
  {},
  true
>;

export type spotifyWidgetConstructor = CreateNodecgConstructor<
  'nodecg-spotify-widget',
  {},
  {
    'spotify-playing-context': SpotifyPlayingContext,
    'spotify-playing-track': SpotifyPlayingTrack
  },
  {},
  true
>;