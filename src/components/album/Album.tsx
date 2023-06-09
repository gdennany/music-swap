import React, { useState } from 'react';
import { AlbumInterface } from '../../Constants';
import SongListModal from '../song-list-modal/SongListModal';

import './Album.css';


interface AlbumProps {
    album: AlbumInterface;
    isSelectable: boolean
}

const Album: React.FC<AlbumProps> = ({ album, isSelectable }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSongListModalOpen, setIsSongListModalOpen] = useState(false);

    const { title, artistName, coverArt, songsList } = album;

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
                <p>{artistName}</p>
            </div>
            <div>
                <button onClick={openModal}>Show Songs</button>
                <SongListModal isOpen={isSongListModalOpen} onRequestClose={closeModal} songs={songsList} />
            </div>
        </div>
    );
};

export default Album;
