export const AMAZON = "Amazon";
export const APPLE = "Apple";
export const SPOTIFY = "Spotify";
export const TIDAL = "Tidal";

export const SERVICES = [AMAZON, APPLE, SPOTIFY, TIDAL];

export interface SongInterface {
    title: string;
    artistName: string;
    coverArt: string;
    audio: string;
};

export interface MusicDataInterface {
    'likedSongs': SongInterface[];
    'albums': any;
    'playlists': any;
}