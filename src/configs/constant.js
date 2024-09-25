const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "cbff0df1d3324cf6913ce933a2c8d6c5";
const CLIENT_SECRET = "eb22338df7154abd92f4b74cb4cab2c8";
const REDIRECT_URI = "http://localhost:3001/home";
const SCOPES = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
];

export { SPOTIFY_AUTH_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES };
