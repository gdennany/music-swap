import queryString from 'query-string';

const redirectToSpotifyLogin = () => {
    const queries = queryString.stringify({
        //TODO: save client ID, secret, and redirectURI in secure location
        // client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_id: '',
        response_type: 'code',
        // redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        redirect_uri: 'http://localhost:3000/fromServiceSelection',
        //TODO: adjust scope if needed.
        scope: 'user-read-private user-read-email'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queries}`;
};

export default redirectToSpotifyLogin;