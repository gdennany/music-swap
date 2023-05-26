import { useContext } from 'react';
import { Context } from '../../Context';
import redirectToSpotifyLogin from '../../scripts/spotify/SpotifyAuthorization';

import "./FromPage.css";

interface FromPageProps extends React.HTMLAttributes<HTMLDivElement> { };

/**
 * Requests access to read the users `fromService` library. If access is granted, users library will appear.
 */
//TODO: clean up this page and associated CSS file. Need to get permissions to read from the users
// `fromService` here
const FromPage: React.FC<FromPageProps> = () => {
    const { fromService, toService, setFromService, setToService } = useContext(Context);

    // if props not properly set go back to the landing page
    setFromService(localStorage.getItem('fromService') ?? '')
    setToService(localStorage.getItem('toService') ?? '')
    if (!fromService || !toService || fromService === "" || toService === "") {
        return (
            <div>
                <p>Please don't access this URL directly &#x1F600;</p>
                <img src="/Dog.JPG" alt="Music Swap Logo" style={{ height: "80%", width: "46%" }} />
            </div>
        )
    }


    return (
        <div className="from-page" >
            <div className="title">
                <h1>Streaming Service Selection</h1>
            </div>

            <div className="button-column-container">
                <div className="button-column">
                    <h2>From:</h2>
                    {fromService}
                </div>
                <div className="button-column">
                    <h2>To:</h2>
                    {toService}
                </div>
            </div>

            <div className="text-block">
                <p>Swapping music from to</p>
            </div>

            <div>
                <h1>Spotify App</h1>
                <button onClick={redirectToSpotifyLogin}>Connect with Spotify</button>
            </div>
        </div>
    );



}

export default FromPage;
