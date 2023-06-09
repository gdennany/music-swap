import React, { useEffect, useState } from 'react';
import { SongInterface } from '../../Constants';

import './Song.css';


interface SongProps {
    song: SongInterface;
    isSelectable: boolean
}

const Song: React.FC<SongProps> = ({ song, isSelectable }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [playAudio, setPlayAudio] = useState<HTMLAudioElement | null>(null);

    const { title, artistName, coverArt, audio } = song;

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
            playAudio?.pause();
            playAudio?.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
            <button className="playButton" onClick={togglePlay}>
                {isPlaying ? '\u23F8' : '\u25B6'}
            </button>

        </div>
    );
};

export default Song;
