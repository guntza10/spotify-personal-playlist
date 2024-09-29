const SPOTIFY_AUTH_URL = process.env.REACT_APP_SPOTIFY_AUTH_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SPOTIFY_SERVICE_URL = process.env.REACT_APP_SPOTIFY_SERVICE_URL;
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
];

export {
  SPOTIFY_AUTH_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SCOPES,
  SPOTIFY_SERVICE_URL,
};
