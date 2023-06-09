import React, { useState } from 'react';
import { PlaylistInterface } from '../../Constants';
import SongListModal from '../song-list-modal/SongListModal';

import './Playlist.css';


interface PlaylistProps {
    playlist: PlaylistInterface;
    isSelectable: boolean
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, isSelectable }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSongListModalOpen, setIsSongListModalOpen] = useState(false);

    const { title, coverArt, songsList } = playlist;

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const openModal = () => {
        setIsSongListModalOpen(true);
    };

    const closeModal = () => {
        setIsSongListModalOpen(false);
    };

    return (
        <div className="albumContainer">
            <input type="checkbox" />
            <img
                className="albumImage"
                src={coverArt}
                alt={title}
            />
            <div className="albumInfo">
                <h3>{title}</h3>
            </div>
            <div>
                <button onClick={openModal}>Show Songs</button>
                <SongListModal isOpen={isSongListModalOpen} onRequestClose={closeModal} songs={songsList} />
            </div>
        </div>
    );
};

export default Playlist;
