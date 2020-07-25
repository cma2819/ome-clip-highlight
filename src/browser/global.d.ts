import {
  CreateNodecgInstance,
  CreateNodecgConstructor
} from 'ts-nodecg/browser';
import { Configschema } from '../nodecg/generated/configschema';
import { ReplicantMap } from '../nodecg/replicants';
import { MessageMap } from '../nodecg/messages';
import { spotifyWidgetConstructor, spotifyWidgetInstance } from '../nodecg/spotifyWidget';
import { SpotifyPlayingContext } from '../nodecg/external/nodecg-spotify-widget/spotifyPlayingContext';
import { SpotifyPlayingTrack } from '../nodecg/external/nodecg-spotify-widget/spotifyPlayingTrack';

declare global {
  const nodecg: CreateNodecgInstance<
    'ome-clip-highlight' | 'nodecg-spotify-widget',
    Configschema,
    ReplicantMap & {
      spotifyPlayingContext: SpotifyPlayingContext;
      spotifyPlayingTrack: SpotifyPlayingTrack;
    },
    MessageMap
  > & spotifyWidgetInstance;
  const NodeCG: CreateNodecgConstructor<
    'ome-clip-highlight',
    Configschema,
    ReplicantMap,
    MessageMap
  > & spotifyWidgetConstructor;
}
