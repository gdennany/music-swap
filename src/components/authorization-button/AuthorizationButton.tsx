import { SPOTIFY } from '../../Constants';
import { redirectToSpotifyLogin } from '../../scripts/spotify/authorization';
import ErrorPage from '../error-page/ErrorPage';
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
        switch (serviceName) {
            case SPOTIFY:
                redirectToSpotifyLogin();
                break;
            default:
                return <ErrorPage errorDescription='Something went wrong.' />;
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
