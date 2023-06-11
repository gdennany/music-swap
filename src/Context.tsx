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
	// addToSelectedSongs: (song: SongSelectedForSwap) => void;
	addToSelectedSongs: (songs: SongSelectedForSwap[]) => void;
	// removeFromSelectedSongs: (song: SongSelectedForSwap) => void;
	removeFromSelectedSongs: (songs: SongSelectedForSwap[]) => void;
	addToSelectedAlbums: (album: AlbumSelectedForSwap) => void;
	removeFromSelectedAlbums: (album: AlbumSelectedForSwap) => void;
	addToSelectedPlaylists: (playlist: PlaylistSelectedForSwap) => void;
	removeFromSelectedPlaylists: (album: PlaylistSelectedForSwap) => void;
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
				// Remove only the song that matches both the title and artist name of the song argument
				songToRemove.title === selectedSong.title && songToRemove.artistName === selectedSong.artistName
			)
		));
	};

	const addToSelectedAlbums = (album: AlbumSelectedForSwap) => {
		setSelectedAlbums([...selectedAlbums, album]);
	};

	const removeFromSelectedAlbums = (album: AlbumSelectedForSwap) => {
		setSelectedAlbums(selectedAlbums.filter(a => !(a.title === album.title && a.artistName === album.artistName)));
	};

	const addToSelectedPlaylists = (playlist: PlaylistSelectedForSwap) => {
		setSelectedPlaylists([...selectedPlaylists, playlist]);
	};

	const removeFromSelectedPlaylists = (playlist: PlaylistSelectedForSwap) => {
		// setSelectedPlaylists(selectedPlaylists.filter(p => !(p.title === playlist.title && p.artistName === playlist.artistName)));
		// CORNER CASE: if two playlists have the same name and number of songs they will both be removed
		setSelectedPlaylists(selectedPlaylists.filter(p => (p.title !== playlist.title && p.songsList.length !== playlist.songsList.length)));
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
