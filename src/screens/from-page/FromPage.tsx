import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./FromPage.css";

interface FromPageProps extends React.HTMLAttributes<HTMLDivElement> {};

const EMPTY = '_______';

/**
 * Page where the user selects which streaming services they want to swap to/from.
 */
const FromPage: React.FC<FromPageProps> = ({ }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    // if props not properly set go back to the landing page
    if (!state || !state.fromService || !state.toService) {
        console.log("navigate('/');")
        navigate('/');
        return null;
    } else {
        return (
            <div className="streaming-service-page" >
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
              </div>
            );
    }
    
    
}

export default FromPage;
