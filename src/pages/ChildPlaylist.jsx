import { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import ChildPlaylistPreview from "../components/ChildPlaylistPreview";
import ReactPlayer from "react-player";
import { TextField } from "@mui/material";

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
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div className="mainContainer">
      <br />
      <TextField
        value={searchInput}
        onChange={handleSearch}
        id="outlined-basic"
        label="Search For A Playlist"
        variant="outlined"
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
