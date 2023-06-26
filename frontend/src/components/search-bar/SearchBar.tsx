import React, { ChangeEvent, useState } from 'react';

import './SearchBar.css';

type SearchBarProps = {
    placeholder: string;
    onSearchTermChange: (searchTerm: string) => void;
};

/**
 * Search bar to display as the first item of each accordian. Lets users search their songs/albums/playlists.
 */
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearchTermChange }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearchTermChange(event.target.value);
    };

    return (
        <div className="search-bar">
            <span className="search-icon">&#x1F50D;</span>
            <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;