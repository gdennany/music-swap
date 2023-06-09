import { useContext, useEffect, useState } from 'react';
import AuthorizationButton from '../../components/authorization-button/AuthorizationButton';
import ErrorPage from '../../components/error-page/ErrorPage';
import { Context } from '../../Context';
import { isEmptyString } from '../../helpers/helpers';
import { fetchSpotifyData, getSpotifyAccessToken } from '../../scripts/spotify/authorization';
import LoadingPage from '../loading-page/LoadingPage';

import "./FromPage.css";
import MusicData from '../../components/music-data/MusicData';
import { AMAZON, APPLE, MusicDataInterface, SPOTIFY, TIDAL } from '../../Constants';

/**
 * Page where user authorizes and selects songs/playlists/etc they want to swap over.
 */
const FromPage: React.FC = () => {

    const { accessToken, fromService, toService, setAccessToken, setFromService, setToService } = useContext(Context);
    const [musicData, setMusicData] = useState<MusicDataInterface | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setFromService(localStorage.getItem('fromService') ?? '');
        setToService(localStorage.getItem('toService') ?? '');

        const fetchData = async () => {
            try {
                setIsLoading(true);
                switch (localStorage.getItem('fromService')) {
                    case AMAZON:
                        break;
                    case APPLE:
                        break;
                    case SPOTIFY:
                        const code = new URLSearchParams(window.location.search).get('code');
                        if (code) {
                            //TODO figure out how to re-use the same access token on page refresh 
                            const token = await getSpotifyAccessToken(code);
                            //Reset the URL to /fromServiceSelection on page refresh
                            // const urlWithoutCode = window.location.protocol + "//" + window.location.host + window.location.pathname;
                            // window.history.replaceState({}, document.title, urlWithoutCode);
                            if (token) {
                                setAccessToken(token);
                                const data = await fetchSpotifyData(token);
                                setMusicData(data);
                            }
                        }
                        break;
                    case TIDAL:
                        break;
                }
                setIsLoading(false);
            } catch (exception) {
                console.log('catch exception: ' + exception)
                setIsError(true);
            }

        };

        fetchData();
    }, [setAccessToken, setFromService, setToService]);


    if (isError) {
        return <ErrorPage errorDescription='Something went wrong while accessing your music library &#x1F914; &#x1F9D0;' />;
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    // Props not properly set => show error page
    if (isEmptyString(fromService) || isEmptyString(toService)) {
        return <ErrorPage errorDescription="Please don't access this URL directly &#x1F600;" />;
    }

    // No access granted to read from fromService yet, so ask for it
    if (isEmptyString(accessToken)) {
        return (
            <div className="from-page" >
                <h1 className="title">From Page</h1>
                <p className="text-block">Click below so we can read from your {fromService} library.</p>
                <AuthorizationButton serviceName={fromService} />
            </div>
        );
    }

    // Access granted, show the users library
    if (musicData !== null) {
        return (
            <div className="from-page" >
                <MusicData musicData={musicData} />
            </div>
        );
    }

    // Shouldn't get this far without a return
    return <ErrorPage errorDescription='Something went wrong while accessing your music library &#x1F914; &#x1F9D0;' />;
}

export default FromPage;
