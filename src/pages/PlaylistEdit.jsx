import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { Alert, Button, TextField } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";

function PlaylistEdit() {
  const { childName, childId } = useParams();
  const [playlistOfChild, setPlaylistOfChild] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [addPlayList, setAddPlayList] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allPlaylistsFromChild = await service.get(
        "playlist/all/" + childId
      );
      setIsPageLoading(false);
      setPlaylistOfChild(allPlaylistsFromChild.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  const handleAddPlaylist = async () => {
    event.preventDefault();
    if (addPlayList === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newPlaylist = await service.post("/playlist/new/" + childId, {
        name: addPlayList,
      });
      setAddPlayList("");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(playlistOfChild);

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 500);
  }

  return (
    <div className="mainContainer">
      <br />
      <h2>{childName}'s Playlists</h2>
      {playlistOfChild &&
        playlistOfChild.map((eachPlaylist) => {
          return (
            <div key={eachPlaylist._id}>
              <br />
              <Link
                to={`/parent/video/edit/${eachPlaylist.name}/${eachPlaylist._id}`}
              >
                <Button variant="outlined" size="large">
                  {" "}
                  {eachPlaylist.name}
                </Button>
              </Link>
            </div>
          );
        })}
      <br />
      <form>
        {/* <label htmlFor="name">Name</label> */}
        <TextField
          size="small"
          label="New Playlist Name"
          type="text"
          name="name"
          value={addPlayList}
          onChange={() => {
            setAddPlayList(
              event.target.value.charAt(0).toUpperCase() +
                event.target.value.slice(1)
            );
            // console.log(event.target.value);
          }}
        ></TextField>

        <Button variant="contained" color="success" onClick={handleAddPlaylist}>
          Add{" "}
        </Button>
        <br />
        {inputErrorMessage && (
          <Alert variant="filled" severity="error">
            {inputErrorMessage}
            <br />
          </Alert>
        )}
      </form>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>{" "}
      <br /> <br /> <br /> <br />
    </div>
  );
}

export default PlaylistEdit;
