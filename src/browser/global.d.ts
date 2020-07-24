import {
  CreateNodecgInstance,
  CreateNodecgConstructor
} from 'ts-nodecg/browser';
import { Configschema } from '../nodecg/generated/configschema';
import { ReplicantMap } from '../nodecg/replicants';
import { MessageMap } from '../nodecg/messages';
import { spotifyWidgetConstructor, spotifyWidgetInstance } from '../nodecg/spotifyWidget';

declare global {
  const nodecg: CreateNodecgInstance<
    'ome-clip-highlight',
    Configschema,
    ReplicantMap,
    MessageMap
  > & spotifyWidgetInstance;
  const NodeCG: CreateNodecgConstructor<
    'ome-clip-highlight',
    Configschema,
    ReplicantMap,
    MessageMap
  > & spotifyWidgetConstructor;
}
