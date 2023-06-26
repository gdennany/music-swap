import axios from 'axios';
import { AlbumInterface, MusicDataInterface, PlaylistInterface, SongInterface } from '../../Constants';

export const redirectToTidalLogin = async () => {
    const response = await axios.get('/tidal-login');

    let auth_url = response.data.auth_url;

    if (!auth_url.startsWith('http://') && !auth_url.startsWith('https://')) {
        auth_url = 'https://' + auth_url;
    }

    // Open the Tidal login page in a new tab
    window.open(auth_url, '_blank');

    // const response = await axios.get('tidal-get-data');
    // console.log("Tidal response: " + JSON.stringify(response));
};

export const fetchTidalData = async () => {
    const response = await axios.get('/tidal-get-data');
    const data = response.data;
    // console.log(JSON.stringify(response.data))

    const songs = data.tracks.map((song: any) => {
        const { id, title, artistName, coverArt, audio } = song
        return {
            id: id,
            title: title,
            artistName: artistName,
            coverArt: coverArt ?? '',
            audio: audio,
        } as SongInterface;
    });


    const albums = data.albums.map((album: any) => {
        const { id, title, artistName, coverArt, songsList } = album;
        return {
            id: id,
            title: title,
            artistName: artistName,
            coverArt: coverArt ?? '',
            // TODO get songs
            songsList: songsList,
        } as AlbumInterface;
    });

    const playlists = data.playlists.map((playlist: any) => {
        const { id, title, coverArt, songsList } = playlist;
        return {
            id: id,
            title: title,
            coverArt: coverArt ?? '',
            // TODO get songs
            songsList: songsList,
        } as PlaylistInterface;
    });

    console.log(playlists)


    return {
        songs: songs,
        albums: albums,
        playlists: playlists,
    } as unknown as MusicDataInterface;
}
