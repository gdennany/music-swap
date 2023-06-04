import React, { ChangeEvent, useEffect, useState } from 'react';

import './Song.css';


interface SongProps {
    song: any;
}

const Song: React.FC<SongProps> = ({ song }) => {
    const { album, name, artists } = song.track;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!audio) {
            const newAudio = new Audio(song.track.preview_url);
            setAudio(newAudio);
        }
    }, []);


    const togglePlay = () => {
        if (isPlaying) {
            audio?.pause();
        } else {
            audio?.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="songContainer">
            <input type="checkbox" />
            <img
                className="songImage"
                src={album.images[0].url}
                alt={name}
            />
            <div className="songInfo">
                <h3>{name}</h3>
                <p>{artists[0].name}</p>
            </div>
            <button className="playButton" onClick={togglePlay}>
                {isPlaying ? '\u23F8' : '\u25B6'}
            </button>
        </div>
    );
};

export default Song;
