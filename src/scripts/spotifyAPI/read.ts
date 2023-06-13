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
        // TODO Commenting out during development => only getting first page of data so its quicker and not as intensive on the API
        // if (data.next) {
        //     const nextPageData = await callEndpoint(accessToken, data.next, true);
        //     data.items = [...data.items, ...nextPageData.items];
        // }

        return data;
    }

    const songs = await callEndpoint(accessToken, 'tracks');
    const albums = await callEndpoint(accessToken, 'albums');
    const playlists = await callEndpoint(accessToken, 'playlists');

    return parseSpotifyData(songs, albums, playlists, accessToken);
};

const parseSpotifyData = async (songs: any, albums: any, playlists: any, accessToken: string) => {

    songs = songs.items.map((song: any) => {
        const { id, album, name, artists, preview_url } = song.track;
        return {
            id: id,
            title: name,
            artistName: artists[0].name,
            coverArt: album.images[0]?.url ?? '',
            audio: preview_url,
        } as SongInterface;
    });

    albums = albums.items.map((album: any) => {
        const { id, name, artists, images, tracks } = album.album;
        return {
            id: id,
            title: name,
            artistName: artists[0].name,
            coverArt: images[0]?.url ?? '',
            songsList: parseSongsFromAlbum(tracks, images[0]?.url ?? ''),
        } as AlbumInterface;
    });

    playlists = await Promise.all(playlists.items.map(async (playlist: any) => {
        const { id, name, images } = playlist;

        const getPlaylistSongs = async (url: string) => {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = response.data;

            //TODO Commenting out during development => only getting first page of data so its quicker and not as intensive on the API
            // if (data.next) {
            //     const nextPageData = await getPlaylistSongs(data.next);
            //     data.items = [...data.items, ...nextPageData.items];
            // }

            return data;
        }

        let tracks = [];
        try {
            tracks = await getPlaylistSongs(playlist.tracks.href);
        } catch (error) {
            console.error('Error in getPlaylistSongs for playlist ' + JSON.stringify(playlist) + error);
        }

        return {
            id: id,
            title: name,
            coverArt: images[0]?.url ?? '',
            songsList: parseSongsFromPlaylist(tracks),
        } as PlaylistInterface;
    }));


    return {
        songs,
        albums,
        playlists
    } as MusicDataInterface;
}
function parseSongsFromAlbum(tracks: any, coverArt: string): SongInterface[] {
    return tracks.items.map((song: any) => {
        const { id, name, artists, preview_url } = song;
        return {
            id: id,
            title: name,
            artistName: artists[0].name,
            coverArt: coverArt,
            audio: preview_url,
        } as SongInterface;
    })
}

function parseSongsFromPlaylist(tracks: any): SongInterface[] {
    return tracks.items?.map((song: any) => {

        if (!song.track || !song.track.album) {
            return {
                id: 'unknown',
                title: 'Unknown title',
                artistName: 'Unknown artist',
                coverArt: '',
                audio: '',
            } as SongInterface;
        }

        const id = song.track?.id ?? 'unknown';
        const album = song.track?.album ?? {};
        const name = song.track?.name ?? '';
        const artists = song.track?.artists ?? [{}];
        const preview_url = song.track?.preview_url ?? '';

        return {
            id: id,
            title: name,
            artistName: artists[0].name ?? 'Unknown artist',
            coverArt: album.images[0]?.url ?? '',
            audio: preview_url,
        } as SongInterface;
    })
}

