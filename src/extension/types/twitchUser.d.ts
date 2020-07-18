export type TwitchUser = {
  broadcasterType: 'partner'|'affiliate'|'';
  description: string;
  displayName: string;
  email: string;
  id: string;
  login: string;
  offlineImageUrl: string;
  profileImageUrl: string;
  type: string;
  viewCount: number;
};