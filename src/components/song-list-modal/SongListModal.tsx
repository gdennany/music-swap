import React from 'react';
import { SongInterface } from '../../Constants';
import Song from '../song/Song';

import "./SongListModal.css";

interface SongListModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    songs: SongInterface[];
}

const SongListModal: React.FC<SongListModalProps> = ({ isOpen, onRequestClose, songs }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modal">
                <button className="close-button" onClick={onRequestClose}>X</button>
                <h2>Songs</h2>
                <ul>
                    {songs.map((song, index) => (
                        <Song key={index} song={song} isSelectable={false} />
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default SongListModal;