const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "cbff0df1d3324cf6913ce933a2c8d6c5";
const REDIRECT_URI = "http://localhost:3001/callback";
const SCOPES = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
];

const loginToSpotify = () => {
  const url = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES.join(" "))}`;
  window.location.href = url;
};

export { loginToSpotify };
