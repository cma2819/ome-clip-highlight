import { NodeCG } from './nodecg';
import { twitch } from './twitch';
import { clipControl } from './clipControl';

export = (nodecg: NodeCG): void => {
  twitch(nodecg);
  clipControl(nodecg);
}