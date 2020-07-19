import { NodeCG } from './nodecg';
import { twitch } from './twitch';
import { clipControl } from './clipControl';
import { importCondition } from './importCondition';

export = (nodecg: NodeCG): void => {
  twitch(nodecg);
  clipControl(nodecg);
  importCondition(nodecg);
}