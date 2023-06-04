import axios from 'axios';
import queryString from 'query-string';

import { client_id, client_secret, redirect_uri } from '../../private';

/**
 * Request access to users spotify data. Callback returns an authorizationCode in the URL.
 */
export const redirectToSpotifyLogin = () => {
    const queries = queryString.stringify({
        // client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_id: client_id,
        response_type: 'code',
        // redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        redirect_uri: redirect_uri,
        //TODO: adjust scope if needed.
        // user-read-private & user-read-email => Not sure if necessary
        // user-library-read => access to "Your Music" library (i.e. liked songs & albums)
        // playlist-read-private playlist-read-collaborative => read users public (collaborative) and private playlists
        scope: 'user-library-read playlist-read-private playlist-read-collaborative'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queries}`;
};


export const readFromSpotifyFlow = async () => {

}

/**
 * 
 * @param authorizationCode authorization code returned from redirectToSpotifyLogin access grant.
 */
export async function getSpotifyAccessToken(authorizationCode: string) {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': authorizationCode,
                'redirect_uri': 'http://localhost:3000/fromServiceSelection'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                }
            }
        );

        // TODO handle refresh token so user doesn't have to go through entire auth process again. 
        // Access tokens expire after a set amount of time(maybe an hour?).
        // const { access_token, refresh_token } = response.data;
        const { access_token } = response.data;
        // Save the access token here
        return access_token;

    } catch (error) {
        console.error('Error in getSpotifyAccessToken: ' + error);
        throw error;
    }
};

export const fetchSpotifyData = async (accessToken: string) => {

    const callEndpoint = async (accessToken: string, url: string, isFullUrl = false) => {
        console.log('fetching!')
        const fullUrl = isFullUrl ? url : `https://api.spotify.com/v1/me/${url}?limit=50`;

        const response = await axios.get(fullUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = response.data;

        // Spotify API returns only 50 items at a time. You must call the "next" endpoint untile there is no next endpoint
        // to get all of the users data.
        //Commenting out during development => only getting first page of data so its quicker and not as intensive on the API
        // if (data.next) {
        //     const nextPageData = await callEndpoint(accessToken, data.next, true);
        //     data.items = [...data.items, ...nextPageData.items];
        // }

        return data;
    }

    const likedSongs = await callEndpoint(accessToken, 'tracks');
    const albums = await callEndpoint(accessToken, 'albums');
    const playlists = await callEndpoint(accessToken, 'playlists');

    let spotyifyMap = {
        'likedSongs': likedSongs,
        'albums': albums,
        'playlists': playlists
    };
    return spotyifyMap;
};
