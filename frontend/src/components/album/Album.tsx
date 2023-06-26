import React, { useContext, useEffect, useState } from 'react';
import { AlbumInterface, AlbumSelectedForSwap } from '../../Constants';
import SongListModal from '../song-list-modal/SongListModal';

import './Album.css';
import { Context } from '../../Context';


interface AlbumProps {
    album: AlbumInterface;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSongListModalOpen, setIsSongListModalOpen] = useState(false);

    const { selectedAlbums, addToSelectedAlbums, removeFromSelectedAlbums } = useContext(Context);

    const { title, artistName, coverArt, songsList } = album;

    useEffect(() => {
        // Make sure checkbox is checked based on selectedAlbums state
        if (selectedAlbums.find(a => a.title === album.title && a.artistName === album.artistName)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedAlbums, album]);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        // user selected this for swap
        if (newCheckedState) {
            addToSelectedAlbums([
                {
                    title,
                    artistName,
                } as AlbumSelectedForSwap
            ]);

        }
        //user deselected this for swap
        else {
            removeFromSelectedAlbums(
                [
                    {
                        title,
                        artistName,
                    } as AlbumSelectedForSwap
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
