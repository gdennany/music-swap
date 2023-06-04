export const AMAZON = "Amazon";
export const APPLE = "Apple";
export const SPOTIFY = "Spotify";
export const TIDAL = "Tidal";

export const SERVICES = [AMAZON, APPLE, SPOTIFY, TIDAL];

export interface MusicDataInterface {
    'likedSongs': object;
    'albums': object;
    'playlists': object;
}