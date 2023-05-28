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
    }
};

export const fetchSpotifyData = async (accessToken: string) => {

    const callEndpoint = async (accessToken: string, endpoint: string) => {
        const response = await axios.get(`https://api.spotify.com/v1/me/${endpoint}?limit=50`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
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
