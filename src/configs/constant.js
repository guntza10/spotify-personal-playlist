const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = `${process.env.REACT_APP_WEB_URL}/callback`;
const SPOTIFY_SERVICE_URL = "https://api.spotify.com/v1";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
];

export {
  CLIENT_ID,
  CLIENT_SECRET,
  SPOTIFY_AUTH_URL,
  REDIRECT_URI,
  SPOTIFY_SERVICE_URL,
  SCOPES,
};
