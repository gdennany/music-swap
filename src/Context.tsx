import React from "react";
import { AlbumSelectedForSwap, PlaylistSelectedForSwap, SongSelectedForSwap } from "./Constants";

// Define the shape of the context state
interface IContextState {
	accessToken: string;
	fromService: string;
	toService: string;
	playingAudio: HTMLAudioElement | null;
	selectedSongs: SongSelectedForSwap[];
	selectedAlbums: AlbumSelectedForSwap[];
	selectedPlaylists: PlaylistSelectedForSwap[];
}

// Define the context type
interface IContextType extends IContextState {
	setAccessToken: (value: string) => void;
	setFromService: (value: string) => void;
	setToService: (value: string) => void;
	setPlayingAudio: (audio: HTMLAudioElement | null) => void;
	addToSelectedSongs: (songs: SongSelectedForSwap[]) => void;
	removeFromSelectedSongs: (songs: SongSelectedForSwap[]) => void;
	addToSelectedAlbums: (albums: AlbumSelectedForSwap[]) => void;
	removeFromSelectedAlbums: (albums: AlbumSelectedForSwap[]) => void;
	addToSelectedPlaylists: (playlists: PlaylistSelectedForSwap[]) => void;
	removeFromSelectedPlaylists: (playlists: PlaylistSelectedForSwap[]) => void;
}

// Create the context (global state) with default values
export const Context = React.createContext<IContextType>({
	accessToken: "",
	fromService: "",
	toService: "",
	playingAudio: null,
	selectedSongs: [],
	selectedAlbums: [],
	selectedPlaylists: [],

	setAccessToken: () => { },
	setFromService: () => { },
	setToService: () => { },
	setPlayingAudio: () => { },
	addToSelectedSongs: () => { },
	removeFromSelectedSongs: () => { },
	addToSelectedAlbums: () => { },
	removeFromSelectedAlbums: () => { },
	addToSelectedPlaylists: () => { },
	removeFromSelectedPlaylists: () => { },
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [accessToken, setAccessToken] = React.useState("");
	const [fromService, setFromService] = React.useState("");
	const [toService, setToService] = React.useState("");
	const [playingAudio, setPlayingAudio] = React.useState<HTMLAudioElement | null>(null);
	const [selectedSongs, setSelectedSongs] = React.useState<SongSelectedForSwap[]>([]);
	const [selectedAlbums, setSelectedAlbums] = React.useState<AlbumSelectedForSwap[]>([]);
	const [selectedPlaylists, setSelectedPlaylists] = React.useState<PlaylistSelectedForSwap[]>([]);

	const addToSelectedSongs = (songs: SongSelectedForSwap[]) => {
		setSelectedSongs(prevSongs => {
			// Only add songs which were not previously selected
			const existingSongMap = new Map(prevSongs.map(song => [song.title + song.artistName, song]));
			const uniqueNewSongs = songs.filter(song => !existingSongMap.has(song.title + song.artistName));

			return [...prevSongs, ...uniqueNewSongs];
		});
	};

	const removeFromSelectedSongs = (songs: SongSelectedForSwap[]) => {
		setSelectedSongs(selectedSongs.filter(selectedSong =>
			!songs.some(songToRemove =>
				songToRemove.title === selectedSong.title && songToRemove.artistName === selectedSong.artistName
			)
		));
	};

	const addToSelectedAlbums = (albums: AlbumSelectedForSwap[]) => {
		setSelectedAlbums(prevAlbums => {
			const existingAlbumMap = new Map(prevAlbums.map(album => [album.title + album.artistName, album]));
			const uniqueNewAlbums = albums.filter(album => !existingAlbumMap.has(album.title + album.artistName));

			return [...prevAlbums, ...uniqueNewAlbums];
		});
	};

	const removeFromSelectedAlbums = (albums: AlbumSelectedForSwap[]) => {
		setSelectedAlbums(selectedAlbums.filter(selectedAlbum =>
			!albums.some(albumToRemove =>
				albumToRemove.title === selectedAlbum.title && albumToRemove.artistName === selectedAlbum.artistName
			)
		));
	};

	// Corner case for adding & removing selected playlists: playlists with the exact same name and number of tracks will be grouped together. The only way around this would be to check for
	// equality of all songs in the playlist. Doesn't seem worth the extra work to cover this corner case.
	// Example: Two separate playlists named "Vibez" both with 11 tracks. Selecting or un-selecting one will select or un-select both. 
	const addToSelectedPlaylists = (playlists: PlaylistSelectedForSwap[]) => {
		setSelectedPlaylists(prevPlaylists => {
			const existingPlaylistMap = new Map(prevPlaylists.map(playlist => [playlist.title + playlist.songsList.length, playlist]));
			const uniqueNewPlaylists = playlists.filter(playlist => !existingPlaylistMap.has(playlist.title + playlist.songsList.length));

			return [...prevPlaylists, ...uniqueNewPlaylists];
		});
	};

	const removeFromSelectedPlaylists = (playlists: PlaylistSelectedForSwap[]) => {
		setSelectedPlaylists(selectedPlaylists.filter(selectedPlaylist =>
			!playlists.some(playlistToRemovce =>
				playlistToRemovce.title === selectedPlaylist.title && playlistToRemovce.songsList?.length === selectedPlaylist.songsList?.length
			)
		));
	};

	return (
		<Context.Provider
			value={{
				accessToken,
				fromService,
				toService,
				playingAudio,
				selectedSongs,
				selectedAlbums,
				selectedPlaylists,

				setAccessToken,
				setFromService,
				setToService,
				setPlayingAudio,
				addToSelectedSongs,
				removeFromSelectedSongs,
				addToSelectedAlbums,
				removeFromSelectedAlbums,
				addToSelectedPlaylists,
				removeFromSelectedPlaylists,
			}}
		>
			{children}
		</Context.Provider>
	);
};
