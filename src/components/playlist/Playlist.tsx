import React, { useContext, useState } from 'react';
import { PlaylistInterface } from '../../Constants';
import SongListModal from '../song-list-modal/SongListModal';

import './Playlist.css';
import { Context } from '../../Context';


interface PlaylistProps {
    playlist: PlaylistInterface;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSongListModalOpen, setIsSongListModalOpen] = useState(false);

    const { selectedPlaylists, addToSelectedPlaylists, removeFromSelectedPlaylists } = useContext(Context);

    const { title, coverArt, songsList } = playlist;

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        // user selected this for swap
        if (newCheckedState) {
            addToSelectedPlaylists({
                title,
                songsList,
            })

        }
        //user deselected this for swap
        else {
            removeFromSelectedPlaylists({
                title,
                songsList,
            })
        }
    };

    const openModal = () => {
        setIsSongListModalOpen(true);
    };

    const closeModal = () => {
        setIsSongListModalOpen(false);
    };

    return (
        <div className="albumContainer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
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
