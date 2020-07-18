import { NodeCG } from './nodecg';
import { TwitchClipStateArray } from '../nodecg/generated/twitchClipStateArray';
import { ClipState } from './types/clipState';

const calcClipRank = (clipStates: TwitchClipStateArray): TwitchClipStateArray => {
  let currentRank = 0;

  return clipStates.map((clip): ClipState => {
    if (clip.disabled) {
      return Object.assign(clip, {
        rank: null
      });
    }
    currentRank++;
    return Object.assign(clip, {
      rank: currentRank
    });
  });
}

export const clipControl = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger(`${nodecg.bundleName}:clip-control`);

  const clipStateArrayReplicant = nodecg.Replicant('twitchClipStateArray', {
    defaultValue: []
  });

  nodecg.listenFor('enableClip', (id: string) => {
    const clips = clipStateArrayReplicant.value;
    const clipState = clips.find((state) => {
      return state.id === id;
    });

    if (clipState) {
      clipState.disabled = false;
      logger.info(`Clip[${id}] becomes enabled.`)
    }
    clipStateArrayReplicant.value = calcClipRank(clips);
  });

  nodecg.listenFor('disableClip', (id: string) => {
    const clips = clipStateArrayReplicant.value;
    const clipState = clips.find((state) => {
      return state.id === id;
    });

    if (clipState) {
      clipState.disabled = true;
      logger.info(`Clip[${id}] becomes disabled.`)
    }
    clipStateArrayReplicant.value = calcClipRank(clips);
  });

}