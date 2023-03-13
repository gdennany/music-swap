import { useState } from 'react';
// import {spotifyAPI} from '../../api/spotify';
import './StreamingServiceButton.css';

const StreamingServiceButton = ({image, text} : {image: string, text: string}) => {
    const [clicked, setClicked] = useState(false);

    function streamingServiceClick() {
        setClicked(!clicked);
        console.log('click')
    }

    return (
        <button className={`button ${clicked ? 'clicked' : 'notClicked'}`} onClick={streamingServiceClick}>
            <img src={image} alt="" className="button-image" />
            <span className="button-text">{text}</span>
        </button>
  );
};

export default StreamingServiceButton;
