import { useContext, useEffect } from 'react';
import AuthorizationButton from '../../components/authorization-button/AuthorizationButton';
import ErrorPage from '../../components/error-page/ErrorPage';
import { Context } from '../../Context';
import { isEmptyString } from '../../helpers/helpers';
import { getSpotifyAccessToken } from '../../scripts/spotify/SpotifyAuthorization';

import "./FromPage.css";

/**
 * Page where user authorizes and selects songs/playlists/etc they want to swap over.
 */
const FromPage: React.FC = () => {
    const { accessToken, fromService, toService, setAccessToken, setFromService, setToService } = useContext(Context);

    // Handle redirect from Spotify
    useEffect(() => {
        setFromService(localStorage.getItem('fromService') ?? '');
        setToService(localStorage.getItem('toService') ?? '');

        const fetchData = async () => {
            const code = new URLSearchParams(window.location.search).get('code')
            if (code) {
                const token = await getSpotifyAccessToken(code);
                if (token) {
                    setAccessToken(token);
                }
            }
        };

        fetchData();
    }, [])

    // Props not properly set => show error page
    if (isEmptyString(fromService) || isEmptyString(toService)) {
        return (
            <ErrorPage />
        );
    }

    // Authorization to read data not granted.
    if (isEmptyString(accessToken)) {
        return (
            <div className="from-page" >
                <div className="title">
                    <h1>From Page</h1>
                </div>

                <div className="text-block">
                    <p>Click below so we can read from your {fromService} library.</p>
                </div>

                <div>
                    {/* <button onClick={redirectToSpotifyLogin}>Connect with Spotify</button> */}
                    <AuthorizationButton serviceName={fromService} />
                </div>
            </div>
        );
    }

    // Show the users library
    return (
        <div className="from-page" >
            successfully authorized
        </div>
    );

}

export default FromPage;
