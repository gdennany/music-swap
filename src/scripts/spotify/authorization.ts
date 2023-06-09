import axios from 'axios';
import queryString from 'query-string';

import { client_id, client_secret, redirect_uri } from '../../private';
import { AlbumInterface, MusicDataInterface, PlaylistInterface, SongInterface } from '../../Constants';

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
        const fullUrl = isFullUrl ? url : `https://api.spotify.com/v1/me/${url}?limit=50`;

        const response = await axios.get(fullUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = response.data;

        // Spotify API returns only 50 items at a time. You must call the "next" endpoint untile there is no next endpoint
        // to get all of the users data.
        // Commenting out during development => only getting first page of data so its quicker and not as intensive on the API
        // if (data.next) {
        //     const nextPageData = await callEndpoint(accessToken, data.next, true);
        //     data.items = [...data.items, ...nextPageData.items];
        // }

        return data;
    }

    const likedSongs = await callEndpoint(accessToken, 'tracks');
    const albums = await callEndpoint(accessToken, 'albums');
    const playlists = await callEndpoint(accessToken, 'playlists');

    return parseSpotifyData(likedSongs, albums, playlists, accessToken);
};

const parseSpotifyData = async (likedSongs: any, albums: any, playlists: any, accessToken: string) => {

    likedSongs = likedSongs.items.map((song: any) => {
        const { album, name, artists, preview_url } = song.track;
        return {
            title: name,
            artistName: artists[0].name,
            coverArt: album.images[0].url,
            audio: preview_url,
        } as SongInterface;
    });

    albums = albums.items.map((album: any) => {
        const { name, artists, images, tracks } = album.album;
        return {
            title: name,
            artistName: artists[0].name,
            coverArt: images[0].url,
            songsList: parseSongsFromAlbum(tracks, images[0].url),
        } as AlbumInterface;
    });

    playlists = await Promise.all(playlists.items.map(async (playlist: any) => {
        //TODO get all songs in a playlist past 100 item limit
        const getPlaylistSongs = async (url: string) => {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = response.data;

            // if (data.next) {
            //     const nextPageData = await getPlaylistSongs(data.next);
            //     data.items = [...data.items, ...nextPageData.items];
            // }

            return data;
        }

        const tracks = await getPlaylistSongs(playlist.tracks.href)

        return {
            title: playlist.name,
            coverArt: playlist.images[0].url,
            //TODO: getting playlist songs not working
            // songsList: parseSongsFromPlaylist(tracks),
            songsList: [],
        } as PlaylistInterface;
    }));

    console.log(JSON.stringify(playlists))

    let spotyifyData = {
        'likedSongs': likedSongs,
        'albums': albums,
        'playlists': playlists
    } as MusicDataInterface;

    return spotyifyData;
}
function parseSongsFromAlbum(tracks: any, coverArt: string): SongInterface[] {
    return tracks.items.map((song: any) => {
        const { album, name, artists, preview_url } = song;
        return {
            title: name,
            artistName: artists[0].name,
            coverArt: coverArt,
            audio: preview_url,
        } as SongInterface;
    })
}

function parseSongsFromPlaylist(tracks: any): SongInterface[] {
    return tracks.items.map((song: any) => {
        const album = song.track?.album ?? {};
        const name = song.track?.name ?? '';
        const artists = song.track?.artists ?? [{}];
        const preview_url = song.track?.preview_url ?? '';

        const temp = {
            title: name,
            //TODO: albumName
            artistName: artists[0].name ?? 'Unknown artist',
            coverArt: album.images[0]?.url ?? 'default_image_url', // replace 'default_image_url' with the actual default image URL
            audio: preview_url,
        } as SongInterface;

        return temp;
        // return {
        //     title: name,
        //     //TODO: albumName
        //     artistName: artists[0].name ?? 'Unknown artist',
        //     coverArt: album.images[0]?.url ?? 'default_image_url', // replace 'default_image_url' with the actual default image URL
        //     audio: preview_url,
        // } as SongInterface;
    })
}

