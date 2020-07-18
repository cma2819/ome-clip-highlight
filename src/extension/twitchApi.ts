import axios, { AxiosError } from 'axios';
import { TwitchUser } from './types/twitchUser';
import { TwitchClip, TwitchClipResponse } from './types/twitchClip';
import { TwitchGameResponse, TwitchGame } from './types/twitchGame';

const tokenUrl = 'https://id.twitch.tv/oauth2/token';

export const authCredential = async (clientKey: string, clientSecret: string, scope = 'user:read:email'): Promise<string> => { 

  const parameters = {
    'client_id': clientKey,
    'client_secret': clientSecret,
    'grant_type': 'client_credentials',
    'scope': scope
  }
  const query = Object.entries(parameters).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&');

  try {
    const response = await axios.post(`${tokenUrl}?${query}`);
    return response.data['access_token'];
  } catch (e) {
    const error = e as AxiosError
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
}

export const getBroadcaster = async (name: string, credentials: {clientId: string; bearer: string}): Promise<TwitchUser> => {
  const url = 'https://api.twitch.tv/helix/users';

  const query = `login=${name}`;
  const response = await axios.get(`${url}?${query}`, {
    headers: {
      'Client-ID': credentials.clientId,
      'Authorization': `Bearer ${credentials.bearer}`
    }
  });
  return response.data['data'][0];
}

export const getClips = async (broadcasterId: string, length: number, start: Date, end: Date, credentials: {clientId: string; bearer: string}): Promise<TwitchClip[]> => {
  const url = 'https://api.twitch.tv/helix/clips';

  const parameters = {
    'broadcaster_id': broadcasterId,
    first: length,
    'started_at': start.toISOString(),
    'ended_at': end.toISOString()
  };

  const response = await axios.get(url, {
    headers: {
      'Client-ID': credentials.clientId,
      'Authorization': `Bearer ${credentials.bearer}`
    },
    params: parameters
  });

  return response.data['data'].map((data: TwitchClipResponse): TwitchClip => {
    return {
      broadcasterId: data.broadcaster_id,
      broadcasterName: data.broadcaster_name,
      createdAt: data.created_at,
      creatorId: data.creator_id,
      creatorName: data.creator_name,
      embedUrl: data.embed_url,
      gameId: data.game_id,
      id: data.id,
      language: data.language,
      pagination: data.pagination,
      thumbnailUrl: data.thumbnail_url,
      title: data.title,
      url: data.url,
      videoId: data.video_id,
      viewCount: data.view_count,
    }
  });
}

export const getGames = async (gameIdArray: string[], credentials: {clientId: string; bearer: string}): Promise<TwitchGame[]> => {
  const url = 'https://api.twitch.tv/helix/games';

  const query = gameIdArray.map((gameId) => {
    return `id=${gameId}`;
  }).join('&');

  const response = await axios.get(`${url}?${query}`, {
    headers: {
      'Client-ID': credentials.clientId,
      'Authorization': `Bearer ${credentials.bearer}`
    }
  });

  return response.data['data'].map((data: TwitchGameResponse): TwitchGame => {
    return {
      boxArtUrl: data.box_art_url,
      id: data.id,
      name: data.name
    }
  });
}