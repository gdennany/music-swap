import React, { useContext } from 'react';
import { SongInterface } from '../../Constants';
import Song from '../song/Song';

import "./SongListModal.css";
import { Context } from '../../Context';

interface SongListModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    songs: SongInterface[];
}

const SongListModal: React.FC<SongListModalProps> = ({ isOpen, onRequestClose, songs }) => {
    const { playingAudio, setPlayingAudio } = useContext(Context);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modal">
                <button
                    className="close-button"
                    onClick={() => {
                        playingAudio?.pause();
                        setPlayingAudio(null);
                        onRequestClose();
                    }}
                >
                    X
                </button>
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