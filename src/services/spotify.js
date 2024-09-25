import axios from "axios";

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SPOTIFY_SERVICE_URL,
} from "../configs/constant";

const spotifyApi = {
  async getAccessToken(code) {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            // grant_type: "authorization_code",
            grant_type: "client_credentials",
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      return { access_token, refresh_token, expires_in };
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  },

  async searchSpotify(query, filter = { offset: 0, limit: 10 }) {
    try {
      const token = localStorage.getItem("spotifyAccessToken");

      const { data } = await axios.get(`${SPOTIFY_SERVICE_URL}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "track",
          limit: filter.limit,
          offset: filter.offset,
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default spotifyApi;
