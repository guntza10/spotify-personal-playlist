import {
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES,
  SPOTIFY_AUTH_URL,
} from "../configs/constant";

const loginToSpotify = () => {
  const url = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES.join(" "))}`;
  window.location.href = url;
};

export { loginToSpotify };
