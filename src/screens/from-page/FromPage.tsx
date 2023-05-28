import { useContext, useEffect, useState } from 'react';
import AuthorizationButton from '../../components/authorization-button/AuthorizationButton';
import ErrorPage from '../../components/error-page/ErrorPage';
import { Context } from '../../Context';
import { isEmptyString } from '../../helpers/helpers';
import { fetchSpotifyData, getSpotifyAccessToken } from '../../scripts/spotify/SpotifyAuthorization';
import LoadingPage from '../loading-page/LoadingPage';

import "./FromPage.css";

/**
 * Page where user authorizes and selects songs/playlists/etc they want to swap over.
 */
const FromPage: React.FC = () => {
    const { accessToken, fromService, toService, setAccessToken, setFromService, setToService } = useContext(Context);
    const [spotifyData, setSpotifyData] = useState<Object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    // Handle redirect from Spotify
    useEffect(() => {
        setFromService(localStorage.getItem('fromService') ?? '');
        setToService(localStorage.getItem('toService') ?? '');

        const fetchData = async () => {
            const code = new URLSearchParams(window.location.search).get('code')
            if (code) {
                setIsLoading(true);
                const token = await getSpotifyAccessToken(code);
                if (token) {
                    setAccessToken(token);
                    const data = await fetchSpotifyData(token);
                    setSpotifyData(data);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setAccessToken, setFromService, setToService])

    if (isLoading) {
        return <LoadingPage />;;
    }

    // Props not properly set => show error page
    if (isEmptyString(fromService) || isEmptyString(toService)) {
        return <ErrorPage />;
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
    console.log('spotify data: ' + JSON.stringify(spotifyData))
    return (

        <div className="from-page" >
            successfully authorized {JSON.stringify(spotifyData)}
        </div>
    );

}

export default FromPage;
