import React, { useEffect, useState } from "react";

import spotifyApi from "../../services/spotify";

import SearchBar from "../../components/feature/SearchBar/SearchBar";
import SearchResults from "../../components/feature/SearchResults/SearchResults";
import Playlist from "../../components/feature/Playlist/Playlist";
import Spinner from "../../components/common/Spinner/Spinner";
import PreviewTrack from "../../components/feature/PreviewTrack/PreviewTrack";
import SuccessDialog from "../../components/common/SuccessDialog/SuccessDialog";
import FailDialog from "../../components/common/FailDialog/FailDialog";

import "./Main.css";

// initial value
const initialPagination = {
  offset: 0,
  limit: 10,
  pageCount: 1,
  total: 0,
};
const initialDialogMessage = {
  heading: "",
  description: "",
};

const Main = React.memo(({ className, ...props }) => {
  // userId
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = spotifyApi.getSpotifyAccessToken();
    if (token) {
      handleOpenLoading();
      spotifyApi
        .getCurrentUserProfile()
        .then(({ id }) => {
          setUserId(id);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(handleCloseLoading);
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

  // isOpenSuccess,isOpenFail
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const [isOpenFailDialog, setIsOpenFailDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(initialDialogMessage);

  const handleOpenSuccessDialog = () => {
    setIsOpenSuccessDialog(true);
  };
  const handleCloseSuccessDialog = () => {
    setIsOpenSuccessDialog(false);
  };
  const handleOpenFailDialog = () => {
    setIsOpenFailDialog(true);
  };
  const handleCloseFailDialog = () => {
    setIsOpenFailDialog(false);
  };

  // search
  const [search, setSearch] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [pagination, setPagination] = useState(initialPagination);

  const handleOpenFailDialogForSearchTrack = () => {
    setDialogMessage({
      heading: "There is no track you've searched.",
      description: "Please try another search.",
    });
    handleOpenFailDialog();
  };
  const fetchTracksFromSpotify = async (search, filter) => {
    try {
      handleOpenLoading();
      const { tracks } = await spotifyApi.searchSpotify(search, filter);
      const { total, limit, offset } = tracks;
      const searchedResults = tracks.items.map(
        ({ id, name, artists, album, uri, preview_url, external_urls }) => ({
          id,
          name,
          artist: artists[0].name,
          album: album.name,
          uri,
          preview_url,
          external_urls,
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
      handleOpenFailDialogForSearchTrack();
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
  const [playlistUrl, setPlaylistUrl] = useState("");

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
  const handleOpenSuccessDialogForCreatePlaylist = () => {
    setDialogMessage({
      heading: "Create playlist success!",
      description: "",
    });
    handleOpenSuccessDialog();
  };
  const handleOpenFailDialogForCreatePlaylist = () => {
    setDialogMessage({
      heading: "Create playlist failed!",
      description: "Please try again.",
    });
    handleOpenFailDialog();
  };
  const handleCreatePlaylist = async () => {
    if (playlistName && personalPlaylist.length > 0) {
      try {
        handleOpenLoading();
        const request = {
          name: playlistName,
        };
        const playlist = await spotifyApi.createPlaylist(userId, request);
        const {
          data: {
            id: playlistId,
            external_urls: { spotify: playlistUrl },
          },
        } = playlist;

        if (playlistId) {
          const trackUris = personalPlaylist.map((v) => v.uri);
          await spotifyApi.addTracksToPlaylist(playlistId, trackUris);
          handleCompleteCreate(playlistUrl);
        } else throw new Error("Create playlist failed!");
      } catch (error) {
        handleOpenFailDialogForCreatePlaylist();
      } finally {
        handleCloseLoading();
      }
    }
  };
  const handleCompleteCreate = (playlistUrl) => {
    setPlaylistName("");
    setPersonalPlaylist([]);
    setPlaylistUrl(playlistUrl);
    handleOpenSuccessDialogForCreatePlaylist();
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
      {isOpenSuccessDialog && (
        <SuccessDialog
          isOpen={isOpenSuccessDialog}
          onClose={handleCloseSuccessDialog}
          message={dialogMessage}
          playlistUrl={playlistUrl}
        />
      )}
      {isOpenFailDialog && (
        <FailDialog
          isOpen={isOpenFailDialog}
          onClose={handleCloseFailDialog}
          message={dialogMessage}
        />
      )}
    </div>
  );
});

export default Main;
