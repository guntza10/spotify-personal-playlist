import React, { useState } from "react";

import spotifyApi from "../../services/spotify";

import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import Playlist from "../../components/Playlist/Playlist";

import "./Main.css";

const Main = React.memo(({ className, ...props }) => {
  // search
  const [search, setSearch] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);

  const handleChangeSearch = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };
  const handleSearch = async (event) => {
    event.preventDefault();

    if (search) {
      try {
        const { tracks } = await spotifyApi.searchSpotify(search);
        const searchedResults = tracks.items.map(
          ({ id, name, artists, album }) => ({
            id,
            name,
            artist: artists[0].name,
            album: album.name,
          })
        );
        setSearchedTracks(searchedResults);
      } catch (error) {
        setSearchedTracks([]);
        alert("Data not found.");
      }
    }
  };

  // personal playlist
  const [personalPlaylist, setPersonalPlaylist] = useState([]);

  const handleAddTrack = (track) => {
    setPersonalPlaylist((prev) => {
      const isExisted = prev.some((v) => v.id === track.id);
      return isExisted ? [...prev] : [...prev, track];
    });
  };
  const handleRemoveTrack = (track) => {
    setPersonalPlaylist((prev) => prev.filter((v) => v.id !== track.id));
  };

  return (
    <div {...props} className={`main-container ${className}`}>
      <SearchBar
        search={search}
        onChange={handleChangeSearch}
        onSearch={handleSearch}
      />
      <div className="content-container">
        <SearchResults tracks={searchedTracks} onAddTrack={handleAddTrack} />
        <Playlist tracks={personalPlaylist} onRemoveTrack={handleRemoveTrack} />
      </div>
    </div>
  );
});

export default Main;
