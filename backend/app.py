from flask import Flask, redirect, request, jsonify
from tidalapi import Session, Favorites, LoggedInUser
from flask_cors import CORS

app = Flask(__name__)

session = Session()

# Placeholder for user_id, which you should retrieve after successful login
# user_id = None


@app.route("/tidal-login")
def login():
    # global user_id
    login, _ = session.login_oauth()
    # Wait for the user to authenticate and set the user_id
    # user_id = future.result().user.id
    return jsonify({"auth_url": login.verification_uri_complete})


def parseSong(track):
    album = session.album(track.album.id)
    coverArt = album.image(80)
    return {
        "id": track.id,
        "title": track.name,
        "artistName": track.artist.name,
        "coverArt": coverArt,
        "audio": track.get_url(),
    }


def parseAlbumSongs(track, artistName, coverArt):
    try:
        return {
            "id": track.id,
            "title": track.name,
            "artistName": artistName,
            "coverArt": coverArt,
            "audio": track.get_url(),
        }
    except:
        return {}


@app.route("/tidal-get-data")
def get_data():
    # global user_id
    # Ensure user is logged in
    if not session.check_login():
        return "Not logged in", 401

    # Retrieve liked songs, albums, and playlists
    user = session.user

    # Initialize the Favorites class with the session and user ID
    favorites = Favorites(session, user.id)

    tracks = favorites.tracks()
    albums = favorites.albums()
    # playlists = favorites.playlists()

    loggedIn = LoggedInUser(session, user.id)
    playlists = loggedIn.playlist_and_favorite_playlists()

    extracted_tracks = []
    for track in tracks:
        extracted_tracks.append(parseSong(track))

    extracted_albums = []
    for album in albums:
        artistName = album.artist.name
        coverArt = album.image(80)

        # unfortunately getting tracks this way gets me rate limited by the API
        albumSongs = []
        # for song in album.tracks():
        #     albumSongs.append(parseAlbumSongs(song, artistName, coverArt))

        extracted_albums.append(
            {
                "id": album.id,
                "title": album.name,
                "artistName": artistName,
                "coverArt": coverArt,
                "songsList": albumSongs,
            }
        )

    extracted_playlists = []
    for playlist in playlists:
        extracted_playlists.append(
            {
                "id": playlist.id,
                "title": playlist.name,
                "coverArt": playlist.image(160),
                "songsList": [],
            }
        )
    # Return the favorite tracks as JSON response
    return jsonify(
        {
            "tracks": extracted_tracks,
            "albums": extracted_albums,
            "playlists": extracted_playlists,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
