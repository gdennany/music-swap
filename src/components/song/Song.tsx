import React, { useEffect, useState } from 'react';
import { AlbumInterface, SongInterface } from '../../Constants';
import { isEmptyString } from '../../helpers/helpers';
import SongListModal from '../song-list-modal/SongListModal';

import './Song.css';


interface SongProps {
    song: SongInterface | AlbumInterface;
    isSelectable: boolean
}

const Song: React.FC<SongProps> = ({ song, isSelectable }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isSongListModalOpen, setIsSongListModalOpen] = useState(false);
    const [playAudio, setPlayAudio] = useState<HTMLAudioElement | null>(null);

    const { title, artistName, coverArt } = song;
    let audio = '';
    let songsList: SongInterface[] = [];

    if ('audio' in song) {
        audio = song.audio;
    }
    if ('songsList' in song) {
        songsList = song.songsList;
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        if (!playAudio) {
            const newAudio = new Audio(audio);
            setPlayAudio(newAudio);
        }
    }, []);


    const togglePlay = () => {
        if (isPlaying) {
            playAudio?.pause();
        } else {
            playAudio?.play();
        }

        setIsPlaying(!isPlaying);
    };

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
        <div className="songContainer">
            {isSelectable
                ? <input type="checkbox" />
                : null}
            <img
                className="songImage"
                src={coverArt}
                alt={title}
            />
            <div className="songInfo">
                <h3>{title}</h3>
                <p>{artistName}</p>
            </div>
            {!isEmptyString(audio)
                ?
                <button className="playButton" onClick={togglePlay}>
                    {isPlaying ? '\u23F8' : '\u25B6'}
                </button>
                :
                <div>
                    <button onClick={openModal}>Show Songs</button>
                    <SongListModal isOpen={isSongListModalOpen} onRequestClose={closeModal} songs={songsList} />
                </div>
            }
        </div>
    );
};

export default Song;
