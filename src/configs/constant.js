const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "cbff0df1d3324cf6913ce933a2c8d6c5";
const CLIENT_SECRET = "eb22338df7154abd92f4b74cb4cab2c8";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
];
const SPOTIFY_SERVICE_URL = "https://api.spotify.com/v1";

export {
  SPOTIFY_AUTH_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SCOPES,
  SPOTIFY_SERVICE_URL,
};
