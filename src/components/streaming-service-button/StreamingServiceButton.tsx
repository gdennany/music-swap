import React from 'react';
// import {spotifyAPI} from '../../api/spotify';
import './button.css';

const StreamingServiceButton = ({image, text} : {image: string, text: string}) => {
    
    function streamingServiceClick() {
        console.log('click')
        // spotifyAPI();
    }

    return (
        <button className="button" onClick={streamingServiceClick}>
            <img src={image} alt="" className="button__image" />
            <span className="button__text">{text}</span>
        </button>
  );
};

export default StreamingServiceButton;
