import React, { useContext, useState } from "react";
import Accordion from "../accordian/Accordian";
import SearchBar from "../search-bar/SearchBar";
import { AlbumInterface, AlbumSelectedForSwap, MusicDataInterface, PlaylistInterface, PlaylistSelectedForSwap, SongInterface, SongSelectedForSwap } from "../../Constants";

import './MusicData.css';
import Song from "../song/Song";
import Album from "../album/Album";
import Playlist from "../playlist/Playlist";
import { Context } from "../../Context";
import SelectAllButtons from "../select-all-buttons/SelectAllButtons";

interface MusicDataProps {
    musicData: MusicDataInterface;
}

/**
 * Displays all of the users music data in accordians. Here is where the usert can select which music from their fromService to swap over to their toService.
 */
const MusicData: React.FC<MusicDataProps> = ({ musicData }) => {
    const [songSearchTerm, setSongSearchTerm] = useState("");
    const [albumSearchTerm, setAlbumSearchTerm] = useState("");
    const [playlistSearchTerm, setPlaylistSearchTerm] = useState("");
    const [callToActionModal, setCallToActionModal] = useState(false);

    const {
        selectedSongs, addToSelectedSongs, removeFromSelectedSongs,
        selectedAlbums, addToSelectedAlbums, removeFromSelectedAlbums,
        selectedPlaylists, addToSelectedPlaylists, removeFromSelectedPlaylists,
    } = useContext(Context);

    // Songs to display which match the search term. Support search by Song title and Artist name
    const visibleSongs = musicData.songs.filter((song: SongInterface) => {
        return (song.title.toLowerCase().includes(songSearchTerm.toLowerCase()) || song.artistName.toLowerCase().includes(songSearchTerm.toLowerCase()));
    });

    // Albums to display which match the search term. Support search by Album title and Artist name
    const visibleAlbums = musicData.albums.filter((album: AlbumInterface) => {
        return (album.title.toLowerCase().includes(albumSearchTerm.toLowerCase()) || album.artistName.toLowerCase().includes(albumSearchTerm.toLowerCase()));
    });

    // Playlists to display which match the search term. Support search by Playlist title
    const visiblePlaylists = musicData.playlists.filter((playlist: PlaylistInterface) => {
        return playlist.title.toLowerCase().includes(playlistSearchTerm.toLowerCase());
    });

    const selectAllClick = (type: number) => {
        switch (type) {
            case 1: //Songs
                const songsToAdd = visibleSongs.map((song: SongInterface) => {
                    return {
                        title: song.title,
                        artistName: song.artistName,
                    } as SongSelectedForSwap;
                });
                addToSelectedSongs(songsToAdd);
                break;
            case 2: //Albums
                const albumsToAdd = visibleAlbums.map((album: AlbumInterface) => {
                    return {
                        title: album.title,
                        artistName: album.artistName,
                    } as AlbumSelectedForSwap;
                });
                addToSelectedAlbums(albumsToAdd);
                break;
            case 3: //Playlists
                const playlistsToAdd = visiblePlaylists.map((playlist: PlaylistInterface) => {
                    return {
                        title: playlist.title,
                        songsList: playlist.songsList,
                    } as PlaylistSelectedForSwap;
                });
                addToSelectedPlaylists(playlistsToAdd);
                break;
        }
    };

    const removeAllClick = (type: number) => {
        switch (type) {
            case 1: //Songs
                const songsToRemove = visibleSongs.map((song: SongInterface) => {
                    return {
                        title: song.title,
                        artistName: song.artistName,
                    } as SongSelectedForSwap;
                });
                removeFromSelectedSongs(songsToRemove);
                break;
            case 2: //Albums
                const albumsToRemove = visibleAlbums.map((album: AlbumInterface) => {
                    return {
                        title: album.title,
                        artistName: album.artistName,
                    } as AlbumSelectedForSwap;
                });
                removeFromSelectedAlbums(albumsToRemove);
                break;
            case 3: //Playlists
                const playlistsToRemove = visiblePlaylists.map((playlist: PlaylistInterface) => {
                    return {
                        title: playlist.title,
                        songsList: playlist.songsList,
                    } as PlaylistSelectedForSwap;
                });
                removeFromSelectedPlaylists(playlistsToRemove);
                break;
        }
    };

    // Resets the respective search term states when an accordian is opened/closed. 
    const accordianOpened = (accordian: number) => {
        switch (accordian) {
            case 1: //Songs
                setSongSearchTerm("");
                break;
            case 2: //Albums
                setAlbumSearchTerm("");
                break;
            case 3: //Playlists
                setPlaylistSearchTerm("")
                break;
        }
    }

    return (
        <div className="music-data-page">
            {selectedSongs.length > 0 || selectedAlbums.length > 0 || selectedPlaylists.length > 0
                ? <button className="initiate-swap-button">Transfer Selected Music</button>
                : null
            }
            <Accordion title="&#x1F3B5;   Songs" onHeaderClicked={() => accordianOpened(1)}>
                <SearchBar placeholder={'Search by song title and artist name'} onSearchTermChange={(searchTerm) => setSongSearchTerm(searchTerm)} />
                <SelectAllButtons onSelectAllClick={() => selectAllClick(1)} onUnselectAllClick={() => removeAllClick(1)} />
                {visibleSongs.map((song: SongInterface) => (
                    <Song key={song.id} song={song} isSelectable={true} />
                ))}
            </Accordion>
            <Accordion title="&#x1F4BF;   Albums" onHeaderClicked={() => accordianOpened(2)}>
                <SearchBar placeholder={'Search by album title & artist name'} onSearchTermChange={(searchTerm) => setAlbumSearchTerm(searchTerm)} />
                <SelectAllButtons onSelectAllClick={() => selectAllClick(2)} onUnselectAllClick={() => removeAllClick(2)} />
                {visibleAlbums.map((album: AlbumInterface) => (
                    <Album key={album.id} album={album} />
                ))}
            </Accordion>
            <Accordion title="&#x1F4CB;   Playlists" onHeaderClicked={() => accordianOpened(3)}>
                <SearchBar placeholder={'Search by playlist title'} onSearchTermChange={(searchTerm) => setPlaylistSearchTerm(searchTerm)} />
                <SelectAllButtons onSelectAllClick={() => selectAllClick(3)} onUnselectAllClick={() => removeAllClick(3)} />
                {visiblePlaylists.map((playlist: PlaylistInterface) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
            </Accordion>
        </div>
    );
};

export default MusicData;
