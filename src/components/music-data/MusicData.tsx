import React, { useContext, useState } from "react";
import Accordion from "../accordian/Accordian";
import SearchBar from "../search-bar/SearchBar";
import SelectAll from "../select-all/SelectAll";
import { AlbumInterface, MusicDataInterface, PlaylistInterface, SongInterface } from "../../Constants";

import './MusicData.css';
import Song from "../song/Song";
import Album from "../album/Album";
import Playlist from "../playlist/Playlist";
import { Context } from "../../Context";

interface MusicDataProps {
    musicData: MusicDataInterface;
}

/**
 * Displays all of the users music data in accordians. Here is where the usert can select which music from their fromService to swap over to their toService.
 */
const MusicData: React.FC<MusicDataProps> = ({ musicData }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const { selectedSongs, selectedAlbums, selectedPlaylists } = useContext(Context);

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSelectAllChange = (checked: boolean) => {
        console.log(`SelectAll Checkbox is now ${checked ? "checked" : "unchecked"}`);
    };

    return (
        <div className="music-data-page">
            <Accordion title="&#x1F3B5;   Songs">
                <SearchBar placeholder={'Search for songs by title or artist name'} onSearchTermChange={handleSearchTermChange} />
                <SelectAll label="Select all &#x2193;" onChecked={handleSelectAllChange} />
                {musicData.likedSongs.map((song: SongInterface, index: number) => (
                    <Song key={index} song={song} isSelectable={true} />
                ))}
            </Accordion>
            <Accordion title="&#x1F4BF;   Albums">
                <SearchBar placeholder={'Search for albums by title or artist name'} onSearchTermChange={handleSearchTermChange} />
                <SelectAll label="Select all &#x2193;" onChecked={handleSelectAllChange} />
                {musicData.albums.map((album: AlbumInterface, index: number) => (
                    <Album key={index} album={album} />
                ))}

            </Accordion>
            <Accordion title="&#x1F4CB;   Playlists">
                <SearchBar placeholder={'Search for playlists title'} onSearchTermChange={handleSearchTermChange} />
                <SelectAll label="Select all &#x2193;" onChecked={handleSelectAllChange} />
                {musicData.playlists.map((playlist: PlaylistInterface, index: number) => (
                    <Playlist key={index} playlist={playlist} />
                ))}
            </Accordion>
            {selectedSongs.length > 0 || selectedAlbums.length > 0 || selectedPlaylists.length > 0
                ? <button className="initiate-swap-button">Swap em</button>
                : null
            }
        </div>
    );
};

export default MusicData;
