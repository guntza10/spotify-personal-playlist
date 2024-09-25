import React from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import Playlist from "../../components/Playlist/Playlist";

import "./Main.css";

const initialTrackList = [
  { id: 1, name: "A", artist: "AA", album: "AAA" },
  { id: 2, name: "B", artist: "BB", album: "BBB" },
  { id: 3, name: "C", artist: "CC", album: "CCC" },
  { id: 4, name: "D", artist: "DD", album: "DDD" },
  { id: 5, name: "E", artist: "EE", album: "EEE" },
];
const Main = React.memo(() => {
  return (
    <div className="main-container">
      <SearchBar />
      <div className="content-container">
        <SearchResults results={initialTrackList} />
        <Playlist />
      </div>
    </div>
  );
});

export default Main;
