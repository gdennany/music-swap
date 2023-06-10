import React from "react";
import { AlbumSelectedForSwap, SongSelectedForSwap } from "./Constants";

// Define the shape of the context state
interface IContextState {
	accessToken: string;
	fromService: string;
	toService: string;
	playingAudio: HTMLAudioElement | null;
	selectedSongs: SongSelectedForSwap[];
	selectedAlbums: AlbumSelectedForSwap[];
}

// Define the context type
interface IContextType extends IContextState {
	setAccessToken: (value: string) => void;
	setFromService: (value: string) => void;
	setToService: (value: string) => void;
	setPlayingAudio: (audio: HTMLAudioElement | null) => void;
	addToSelectedSongs: (song: SongSelectedForSwap) => void;
	removeFromSelectedSongs: (song: SongSelectedForSwap) => void;
	addToSelectedAlbums: (song: AlbumSelectedForSwap) => void;
	removeFromSelectedAlbums: (song: AlbumSelectedForSwap) => void;
}

// Create the context (global state) with default values
export const Context = React.createContext<IContextType>({
	accessToken: "",
	fromService: "",
	toService: "",
	playingAudio: null,
	selectedSongs: [],
	selectedAlbums: [],

	setAccessToken: () => { },
	setFromService: () => { },
	setToService: () => { },
	setPlayingAudio: () => { },
	addToSelectedSongs: () => { },
	removeFromSelectedSongs: () => { },
	addToSelectedAlbums: () => { },
	removeFromSelectedAlbums: () => { },
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

	const addToSelectedSongs = (song: SongSelectedForSwap) => {
		setSelectedSongs([...selectedSongs, song]);
	};

	const removeFromSelectedSongs = (song: SongSelectedForSwap) => {
		// Remove only the song that matches both the title and artist name of the song argument
		setSelectedSongs(selectedSongs.filter(s => !(s.title === song.title && s.artistName === song.artistName)));
	};

	const addToSelectedAlbums = (album: AlbumSelectedForSwap) => {
		setSelectedAlbums([...selectedAlbums, album]);
	};

	const removeFromSelectedAlbums = (album: AlbumSelectedForSwap) => {
		// Remove only the song that matches both the title and artist name of the song argument
		setSelectedAlbums(selectedAlbums.filter(a => !(a.title === album.title && a.artistName === album.artistName)));
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

				setAccessToken,
				setFromService,
				setToService,
				setPlayingAudio,
				addToSelectedSongs,
				removeFromSelectedSongs,
				addToSelectedAlbums,
				removeFromSelectedAlbums,
			}}
		>
			{children}
		</Context.Provider>
	);
};
