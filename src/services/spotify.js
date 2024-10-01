import axios from "axios";

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SPOTIFY_SERVICE_URL,
} from "../configs/constant";

const spotifyApi = {
  getSpotifyAccessToken() {
    return localStorage.getItem("spotifyAccessToken");
  },
  isTokenExpired() {
    const expires = localStorage.getItem("spotifyTokenExpires");
    return Date.now() > expires;
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem("spotifyRefreshToken");
    try {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, expires_in } = data;
      localStorage.setItem("spotifyAccessToken", access_token);
      localStorage.setItem(
        "spotifyTokenExpires",
        Date.now() + expires_in * 1000
      );
    } catch (error) {
      throw new Error(`Error refreshing access token: ${error}`);
    }
  },
  async getAccessToken(code) {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      return { access_token, refresh_token, expires_in };
    } catch (error) {
      console.error(
        "Error fetching access token:",
        error.response?.data || error.message
      );
      throw new Error(error.message);
    }
  },
  async getCurrentUserProfile() {
    try {
      if (this.isTokenExpired()) {
        await this.refreshToken();
      }

      const token = this.getSpotifyAccessToken();
      const { data } = await axios.get(`${SPOTIFY_SERVICE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async searchSpotify(query, filter = { offset: 0, limit: 10 }) {
    try {
      if (this.isTokenExpired()) {
        await this.refreshToken();
      }

      const token = this.getSpotifyAccessToken();
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
  async createPlaylist(userId, data) {
    try {
      if (this.isTokenExpired()) {
        await this.refreshToken();
      }

      const token = this.getSpotifyAccessToken();
      const response = await axios.post(
        `${SPOTIFY_SERVICE_URL}/users/${userId}/playlists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async addTracksToPlaylist(playlistId, trackUris) {
    try {
      if (this.isTokenExpired()) {
        await this.refreshToken();
      }

      const token = this.getSpotifyAccessToken();
      const response = await axios.post(
        `${SPOTIFY_SERVICE_URL}/playlists/${playlistId}/tracks`,
        {
          uris: trackUris,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default spotifyApi;
