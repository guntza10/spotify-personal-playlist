import React, { useEffect, useState } from "react";

import spotifyApi from "../../services/spotify";

import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import Playlist from "../../components/Playlist/Playlist";
import Spinner from "../../components/Spinner/Spinner";
import PreviewTrack from "../../components/PreviewTrack/PreviewTrack";

import "./Main.css";

// initial value
const initialPagination = {
  offset: 0,
  limit: 10,
  pageCount: 1,
  total: 0,
};
const Main = React.memo(({ className, ...props }) => {
  // userId
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = spotifyApi.getSpotifyAccessToken();
    if (token) {
      handleOpenLoading();
      spotifyApi.getCurrentUserProfile().then(({ id }) => {
        setUserId(id);
        handleCloseLoading();
      });
    }
  }, []);

  // loading
  const [loading, setLoading] = useState(false);

  const handleOpenLoading = () => {
    setLoading(true);
  };
  const handleCloseLoading = () => {
    setLoading(false);
  };

  // isOpenPreviewTrack
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isOpenPreviewTrack, setIsOpenPreviewTrack] = useState(false);

  const handleOpenPreviewTrack = (track) => {
    setSelectedTrack(track);
    setIsOpenPreviewTrack(true);
  };
  const handleClosePreviewTrack = () => {
    setIsOpenPreviewTrack(false);
  };

  // search
  const [search, setSearch] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);

  const [pagination, setPagination] = useState(initialPagination);

  const fetchTracksFromSpotify = async (search, filter) => {
    try {
      handleOpenLoading();
      const { tracks } = await spotifyApi.searchSpotify(search, filter);
      const { total, limit, offset } = tracks;
      const searchedResults = tracks.items.map(
        ({ id, name, artists, album, uri, preview_url }) => ({
          id,
          name,
          artist: artists[0].name,
          album: album.name,
          uri,
          preview_url,
          action: handleOpenPreviewTrack,
        })
      );

      setSearchedTracks(searchedResults);
      setPagination({
        offset,
        limit,
        pageCount: Math.floor(total / limit),
        total,
      });
    } catch (error) {
      setSearchedTracks([]);
      alert("Data not found.");
    } finally {
      handleCloseLoading();
    }
  };
  const handleChangeSearch = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (search) {
      fetchTracksFromSpotify(search);
    }
  };
  const handlePageChange = ({ selected }) => {
    const { limit } = pagination;
    const offset = selected * limit;
    const filter = {
      offset,
      limit: limit,
    };
    fetchTracksFromSpotify(search, filter);
  };

  // personal playlist
  const [playlistName, setPlaylistName] = useState("");
  const [personalPlaylist, setPersonalPlaylist] = useState([]);

  const handleChangePlaylistName = ({ target }) => {
    const { value } = target;
    setPlaylistName(value);
  };
  const handleAddTrack = (track) => {
    setPersonalPlaylist((prev) => {
      const isExisted = prev.some((v) => v.id === track.id);
      return isExisted ? [...prev] : [...prev, track];
    });
  };
  const handleRemoveTrack = (track) => {
    setPersonalPlaylist((prev) => prev.filter((v) => v.id !== track.id));
  };
  const handleCreatePlaylist = async () => {
    if (playlistName) {
      try {
        handleOpenLoading();
        const request = {
          name: playlistName,
        };
        const playlist = await spotifyApi.createPlaylist(userId, request);
        const playlistId = playlist.data.id;

        if (playlistId) {
          const trackUris = personalPlaylist.map((v) => v.uri);
          await spotifyApi.addTracksToPlaylist(playlistId, trackUris);
          handleCompleteCreate();
        } else throw new Error("Create playlist failed!");
      } catch (error) {
        alert("Create playlist failed!");
      } finally {
        handleCloseLoading();
      }
    }
  };
  const handleCompleteCreate = () => {
    setPlaylistName("");
    setPersonalPlaylist([]);
  };

  return (
    <div {...props} className={`main-container ${className}`}>
      {loading && <Spinner />}
      <SearchBar
        search={search}
        onChange={handleChangeSearch}
        onSearch={handleSearch}
      />
      <div className="content-container">
        <SearchResults
          tracks={searchedTracks}
          pageCount={pagination.pageCount}
          total={pagination.total}
          onPageChange={handlePageChange}
          onAddTrack={handleAddTrack}
        />
        <Playlist
          tracks={personalPlaylist}
          playlistName={playlistName}
          onChangePlaylistName={handleChangePlaylistName}
          onRemoveTrack={handleRemoveTrack}
          onCreatePlaylist={handleCreatePlaylist}
        />
      </div>

      {/* Modal */}
      {isOpenPreviewTrack && selectedTrack && (
        <PreviewTrack
          track={selectedTrack}
          isOpen={isOpenPreviewTrack}
          onClose={handleClosePreviewTrack}
        />
      )}
    </div>
  );
});

export default Main;
