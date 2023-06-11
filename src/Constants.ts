export const AMAZON = "Amazon";
export const APPLE = "Apple";
export const SPOTIFY = "Spotify";
export const TIDAL = "Tidal";

export const SERVICES = [AMAZON, APPLE, SPOTIFY, TIDAL];

// Data required to represent a Song component
export interface SongInterface {
    title: string;
    artistName: string;
    coverArt: string;
    audio: string;
};

// Data required to represent an Album component
export interface AlbumInterface {
    title: string;
    artistName: string;
    coverArt: string;
    songsList: SongInterface[];
};

// Data required to represent a Playlist component
export interface PlaylistInterface {
    title: string;
    coverArt: string;
    songsList: SongInterface[];
};

// How data fetched from a service should be structured to display on the Music Data Page.
export interface MusicDataInterface {
    songs: SongInterface[];
    albums: AlbumInterface[];
    playlists: PlaylistInterface[];
};

export interface SongSelectedForSwap {
    title: string;
    artistName: string;
};

export interface AlbumSelectedForSwap {
    title: string;
    artistName: string;
}

export interface PlaylistSelectedForSwap {
    title: string;
    songsList: SongSelectedForSwap[];
}

export interface MusicSelectedForSwap {
    songs: SongSelectedForSwap[];
    albums: AlbumSelectedForSwap[];
    playlists: PlaylistSelectedForSwap[];
};