import React, { useContext, useEffect, useState } from 'react';
import { PlaylistInterface, PlaylistSelectedForSwap } from '../../Constants';
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

    useEffect(() => {
        // Make sure checkbox is checked based on selectedAlbums state
        // CORNER CASE: if two playlists have the same name and number of songs they will both be removed (seems better than checking equality for every song in the list)
        if (selectedPlaylists.find(p => p.title === playlist.title && p.songsList?.length === playlist.songsList?.length)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedPlaylists, playlist]);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        // user selected this for swap
        if (newCheckedState) {
            addToSelectedPlaylists(
                [
                    {
                        title,
                        songsList,
                    } as PlaylistSelectedForSwap
                ]
            );
        }
        //user deselected this for swap
        else {
            removeFromSelectedPlaylists(
                [
                    {
                        title,
                        songsList,
                    } as PlaylistSelectedForSwap
                ]
            );
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
