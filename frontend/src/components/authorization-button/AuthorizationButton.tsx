import { AMAZON, APPLE, SPOTIFY, TIDAL } from '../../Constants';
import { redirectToAmazonLogin } from '../../api/amazon/read';
import { redirectToSpotifyLogin } from '../../api/spotify/read';
import { redirectToTidalLogin } from '../../api/tidal/read';
import './AuthorizationButton.css';


interface AuthorizationButtonProps {
    serviceName: string;
}

/**
 * Renders a button that user presses to send an access request to a streaming sercvice. 
 * Button has an image on the left an text on the right, and animates on hover/click.
 */
const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({ serviceName }) => {

    const handleClick = (serviceName: string) => {
        switch (serviceName) {
            case AMAZON:
                redirectToAmazonLogin();
                break;
            case APPLE:
                break;
            case SPOTIFY:
                redirectToSpotifyLogin();
                break;
            case TIDAL:
                redirectToTidalLogin();
        }
    };

    return (
        <div>
            <button
                className="button"
                onClick={() => handleClick(serviceName)}
            >
                <img src={"/" + serviceName + ".png"} alt="" className="button-image" />
                <span className="button-text">{serviceName}</span>
            </button>
        </div>
    );
};

export default AuthorizationButton;
