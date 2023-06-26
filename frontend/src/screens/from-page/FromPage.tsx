import { useContext, useEffect, useState } from 'react';
import AuthorizationButton from '../../components/authorization-button/AuthorizationButton';
import ErrorPage from '../../components/error-page/ErrorPage';
import { Context } from '../../Context';
import { isEmptyString } from '../../helpers/helpers';
import { fetchSpotifyData, getSpotifyAccessToken } from '../../api/spotify/read';
import LoadingPage from '../loading-page/LoadingPage';

import "./FromPage.css";
import MusicData from '../../components/music-data/MusicData';
import { AMAZON, APPLE, MusicDataInterface, SPOTIFY, TIDAL } from '../../Constants';
import { fetchAppleData } from '../../api/apple/read';
import { fetchAmazonData, getAmazonAccessToken, redirectToAmazonLogin } from '../../api/amazon/read';
import { fetchTidalData } from '../../api/tidal/read';

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
                        const amazonAuthCode = new URLSearchParams(window.location.search).get('code');
                        if (amazonAuthCode) {
                            const token = await getAmazonAccessToken(amazonAuthCode);
                            if (token) {
                                // TODO: amazon access token fetch working properly, but need to wait for amazon team to allow me access to
                                // api.music.amazon.dev before I can complete fetchAmazonData. Currently receiving a 403
                                setAccessToken(token);
                                // const data = await fetchAmazonData(token);
                                // setMusicData(data);
                            }
                        }
                        break;
                    case APPLE:
                        const data = await fetchAppleData();
                        break;
                    case SPOTIFY:
                        const spotifyAuthCode = new URLSearchParams(window.location.search).get('code');
                        if (spotifyAuthCode) {
                            //TODO figure out how to re-use the same access token on page refresh 
                            const token = await getSpotifyAccessToken(spotifyAuthCode);
                            //Reset the URL to /swapScreen on page refresh
                            const urlWithoutCode = window.location.protocol + "//" + window.location.host + window.location.pathname;
                            window.history.replaceState({}, document.title, urlWithoutCode);
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

    const testTidalButtonClick = async () => {
        const data = await fetchTidalData();
        setMusicData(data);
    }
    // No access granted to read from fromService yet, so ask for it
    if (isEmptyString(accessToken) && musicData === null) {
        return (
            <div className="from-page" >
                <p className="text-block">Click below so we can read from your {fromService} library.</p>
                <AuthorizationButton serviceName={fromService} />
                <button onClick={testTidalButtonClick} > click me</button>
            </div>
        );
    }

    // Access granted, show the users library
    if (musicData !== null) {
        return (
            // I should just pass a MusicData component but I can't figure out the styling properly without doing it this way
            <div className="from-page" >
                <MusicData musicData={musicData} />
            </div>
        );
    }

    // Shouldn't get this far without a return
    return <ErrorPage errorDescription='Something went wrong while accessing your music library &#x1F914; &#x1F9D0;' />;
}

export default FromPage;
