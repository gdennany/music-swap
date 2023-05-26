import { redirectToSpotifyLogin } from '../../scripts/spotify/SpotifyAuthorization';
import './AuthorizationButton.css';


interface MyComponentProps {
    serviceName: string;
}

/**
 * Renders a button that user presses to send an access request to a streaming sercvice. 
 * Button has an image on the left an text on the right, and animates on hover/click.
 */
const AuthorizationButton: React.FC<MyComponentProps> = ({ serviceName }) => {

    const handleClick = (serviceName: string) => {
        redirectToSpotifyLogin();
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
