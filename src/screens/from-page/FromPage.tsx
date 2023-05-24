import { useLocation } from 'react-router-dom';

import "./FromPage.css";

interface FromPageProps extends React.HTMLAttributes<HTMLDivElement> {};

/**
 * Requests access to read the users `fromService` library. If access is granted, users library will appear.
 */
//TODO: clean up this page and associated CSS file. Need to get permissions to read from the users
// `fromService` here
const FromPage: React.FC<FromPageProps> = () => {
    const { state } = useLocation();
    

    // if props not properly set go back to the landing page 
    if (!state || !state.fromService || !state.toService) {
        return (
            <div>
                <p>Please don't access this URL directly &#x1F600;</p>
                <img src="/Dog.JPG" alt="Music Swap Logo" style={{height:"80%", width:"46%"}}/>
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
                    {state.fromService}
                </div>
                <div className="button-column">
                    <h2>To:</h2>
                    {state.toService}
                </div>
            </div>
        
            <div className="text-block">
                <p>Swapping music from to</p>
            </div>

            <div>
            <h1>Spotify App</h1>
            </div>
        </div>
        );
    
    
    
}

export default FromPage;
