export type TwitchClip = {
  broadcasterId: string;
  broadcasterName: string;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  embedUrl: string;
  gameId: string;
  id: string;
  language: string;
  pagination: {
    [k: string]: string;
  };
  thumbnailUrl: string;
  title: string;
  url: string;
  videoId: string;
  viewCount: number;
}

export type TwitchClipResponse = {
  broadcaster_id: string;
  broadcaster_name: string;
  created_at: string;
  creator_id: string;
  creator_name: string;
  embed_url: string;
  game_id: string;
  id: string;
  language: string;
  pagination: {
    [k: string]: string;
  };
  thumbnail_url: string;
  title: string;
  url: string;
  video_id: string;
  view_count: number;
}