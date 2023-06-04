import React, { useState } from "react";
import Accordion from "../accordian/Accordian";
import SearchBar from "../search-bar/SearchBar";
import SelectAll from "../select-all/SelectAll";
import { MusicDataInterface } from "../../Constants";

import './MusicData.css';
import Song from "../song/Song";

interface MusicDataProps {
    musicData: MusicDataInterface;
}

/**
 * Displays all of the users music data in an accordian. here is where the usert can select which music from their fromService to swap over to their toService.
 */
const MusicData: React.FC<MusicDataProps> = ({ musicData }) => {
    const [searchTerm, setSearchTerm] = useState("");

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
                {musicData.likedSongs.items.map((song: any, index: number) => (
                    <Song key={index} song={song} />
                ))}
            </Accordion>
            <Accordion title="&#x1F4BF;   Albums">
                <SearchBar placeholder={'Search for albums by title or artist name'} onSearchTermChange={handleSearchTermChange} />
                <SelectAll label="Select all &#x2193;" onChecked={handleSelectAllChange} />
                <Accordion title="Album 1">
                    <p>Content for Album 1</p>
                </Accordion>
                <Accordion title="Album 2">
                    <p>Content for Album 2</p>
                </Accordion>
            </Accordion>
            <Accordion title="&#x1F4CB;   Playlists">
                <SearchBar placeholder={'Search for playlists title'} onSearchTermChange={handleSearchTermChange} />
                <SelectAll label="Select all &#x2193;" onChecked={handleSelectAllChange} />
                <Accordion title="Playlist 1">
                    <p>Content for Playlist 1</p>
                </Accordion>
                <Accordion title="Playlist 2">
                    <p>Content for Playlist 2</p>
                </Accordion>
            </Accordion>
        </div>
    );
};

export default MusicData;
