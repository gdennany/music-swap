import React, { useContext, useEffect, useState } from 'react';
import { SongInterface } from '../../Constants';

import './Song.css';
import { Context } from '../../Context';


interface SongProps {
    song: SongInterface;
    isSelectable: boolean
}

const Song: React.FC<SongProps> = ({ song, isSelectable }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [playAudio, setPlayAudio] = useState<HTMLAudioElement | null>(null);

    const { playingAudio, setPlayingAudio } = useContext(Context);
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
            // If there is any playing audio, pause it
            if (playingAudio) {
                playingAudio.pause();
            }
            // Play the new audio and set it as the current playing audio
            playAudio?.play();
            setPlayingAudio(playAudio);
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        // Pause this audio if it's not the current playing audio
        if (playingAudio !== playAudio && isPlaying) {
            playAudio?.pause();
            setIsPlaying(false);
        }
    }, [playingAudio]);

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
