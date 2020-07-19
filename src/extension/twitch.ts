import { NodeCG } from './nodecg';
import { authCredential, getBroadcaster, getClips, getGames } from './twitchApi';

export const twitch = async (nodecg: NodeCG): Promise<void> => {
  const logger = new nodecg.Logger(`${nodecg.bundleName}:twitch`);

  const twitchClipArrayReplicant = nodecg.Replicant('twitchClipArray',{
    defaultValue: []
  });
  const clipStateArrayReplicant = nodecg.Replicant('twitchClipStateArray', {
    defaultValue: []
  });
  const twitchGameArrayReplicant = nodecg.Replicant('twitchGameArray', {
    defaultValue: []
  });
  const currentTwitchClipReplicant = nodecg.Replicant('currentTwitchClip', {
    defaultValue: null
  });

  const clientKey = nodecg.bundleConfig.twitch.key;
  const clientSecret = nodecg.bundleConfig.twitch.secret;

  if (!clientKey || !clientSecret) {
    logger.error('Either Twitch client key or secret is invalid.');
    return;
  }

  nodecg.listenFor('importClip', async ({channel, sort, length, start, end}) => {

    logger.info(`Processing import clips from [${channel}].`);
    twitchClipArrayReplicant.value = [];
    clipStateArrayReplicant.value = [];

    try {
      const bearer = await authCredential(clientKey, clientSecret);
      if (!bearer) {
        logger.error('Bearer token is undefined.');
        return;
      }
  
      const broadcaster = await getBroadcaster(channel, {
        clientId: clientKey,
        bearer
      });
  
      const clips = await getClips(broadcaster.id, length, new Date(Date.parse(start)), new Date(Date.parse(end)), {
        clientId: clientKey,
        bearer
      });
  
      const sortedClips = clips.sort((a, b) => {
        if (a[sort] > b[sort]) {
          return -1;
        }
        if (a[sort] < b[sort]) {
          return 1;
        }
        return 0;
      });

      const gameIdArray = sortedClips.map((clip): string => {
        return clip.gameId;
      });

      const games =  await getGames(gameIdArray, {
        clientId: clientKey,
        bearer
      });
  
      twitchClipArrayReplicant.value = sortedClips;
      twitchGameArrayReplicant.value = games.map((game) => {
        return {
          id: game.id,
          name: game.name
        };
      })
      clipStateArrayReplicant.value = sortedClips.map((clip, index) => {
        return {
          id: clip.id,
          disabled: false,
          rank: index + 1
        };
      });
      currentTwitchClipReplicant.value = sortedClips[0]?.id || null;
      logger.info(`Success to import clips from [${channel}].`);
      logger.info(`Imported ${sortedClips.length} clips with ${games.length} games.`);

      nodecg.sendMessage('saveCondition', {
        channelName: channel,
        sortKey: sort,
        startDate: start,
        endDate: end,
        clipLength: length
      });
      
    } catch (e) {
      const error = e as Error;
      logger.error('Failed to import clip.');
      logger.error(error.message);
    }
    
  });

  return;
}
