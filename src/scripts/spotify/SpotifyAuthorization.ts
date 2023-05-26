import queryString from 'query-string';
import { isEmptyString } from '../../helpers/helpers';

//TODO: save client ID, secret, and redirectURI in secure location
const client_id = '';
const client_secret = '';
const redirect_uri = 'http://localhost:3000/fromServiceSelection';

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
        // playlist-read-private playlist-read-collaborative => read users public (collaborative) and private playlists
        scope: 'playlist-read-private playlist-read-collaborative'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queries}`;
};

/**
 * 
 * @param authorizationCode authorization code returned from redirectToSpotifyLogin access grant.
 */
export async function getSpotifyAccessToken(authorizationCode: string) {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            },
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': authorizationCode,
                'redirect_uri': 'http://localhost:3000/fromServiceSelection'
            }),
        });

        console.log('Response: ' + response.status);
        if (response.ok) {
            const data = await response.json();
            // TODO handle refresh token so user doesn't have to go through entire auth process again. Access tokens expire after a set amount of time(maybe an hour?).
            const { access_token, refresh_token } = data;
            console.log('access_token: ' + access_token);
            // Save the access token here
            return access_token;
        } else {
            console.log('Response Status not okay');
        }
    } catch (error) {
        console.log('Error in getSpotifyAccessToken: ' + error);
    }
};

async function getUserPlaylists(access_token: string) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Response Status not okay');
        }
    } catch (error) {
        console.error(error);
    }
}