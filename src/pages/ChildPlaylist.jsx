import { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import ChildPlaylistPreview from "../components/ChildPlaylistPreview";
import ReactPlayer from "react-player";
import { TextField } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function ChildPlaylist() {
  const { activeChildId } = useContext(AuthContext);
  const [allPlaylistsFromChild, setAllPlaylistsFromChild] = useState(null);
  const [backUpPlaylistsFromChild, setBackUpPlaylistsFromChild] =
    useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  // console.log("from ChildPlaylist", activeChildId);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!activeChildId) {
      return;
    }

    try {
      const allPlaylistsFromChildRequest = await service.get(
        "playlist/all/" + activeChildId
      );
      setIsPageLoading(false);
      setAllPlaylistsFromChild(allPlaylistsFromChildRequest.data);
      setBackUpPlaylistsFromChild(allPlaylistsFromChildRequest.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);

    const searchResults = backUpPlaylistsFromChild.filter((eachPlaylist) => {
      if (
        eachPlaylist.name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    setAllPlaylistsFromChild(searchResults);
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 1000);
  }

  return (
    <div className="mainContainer">
      <br />

      <TextField
        variant="filled"
        color="secondary"
        value={searchInput}
        onChange={handleSearch}
        id="outlined-basic"
        label="Search For A Playlist"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <br />
      {allPlaylistsFromChild &&
        allPlaylistsFromChild.map((eachPlaylist) => {
          return (
            <ChildPlaylistPreview
              key={eachPlaylist._id}
              playlistId={eachPlaylist._id}
              playlistName={eachPlaylist.name}
            />
          );
        })}
    </div>
  );
}

export default ChildPlaylist;
