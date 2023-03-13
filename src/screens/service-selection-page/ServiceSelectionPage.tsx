import { useState } from "react";
import StreamingServiceButton from "../../components/streaming-service-button/StreamingServiceButton";
import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> {}
  
const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    return  (
    <div className="streaming-service-page" id={id} {...rest}>
        <div className="title">
            <h1>Streaming Services</h1>
        </div>
  
        <div className="button-column-container">
            <div className="button-column">
                <h2>From:</h2>
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
            </div>
            <div className="button-column">
                <h2>To:</h2>
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
                <StreamingServiceButton image="/SpotifyLogo.png" text="Spotify" />
            </div>
        </div>
  
        <div className="text-block">
          <p>Swapping from XXXX to XXXX</p>
        </div>
      </div>
    );
    
}

export default ServiceSelectionPage;
