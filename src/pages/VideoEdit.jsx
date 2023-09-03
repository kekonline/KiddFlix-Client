import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import ParentPlayer from "../components/ParentPlayer";
import { Alert, Button, TextField } from "@mui/material";

function VideoEdit() {
  const { playlistName, playlistId } = useParams();
  const [videosOfPlaylist, setVideosOfPlaylist] = useState(null);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [addVideo, setAddVideo] = useState("");
  const [activeEditName, setActiveEditName] = useState(false);
  const [playlistNameInput, setPlaylistNameInput] = useState("");
  const [backUpPlaylistName, setBackUpPlaylistName] = useState("");
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [childId, setChildId] = useState("");
  const [canDeletePlaylist, setCanDeletePlaylist] = useState(false);
  const [isPageloading, setIsPageLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getNumberOfPlaylist();
  }, [childId]);

  const getData = async () => {
    try {
      const allVideosFromPlaylist = await service.get(
        "playlist/videos/" + playlistId
      );
      // console.log(playlistId);

      setChildId(allVideosFromPlaylist.data.child);
      // console.log(allVideosFromPlaylist.data.child);
      setBackUpPlaylistName(allVideosFromPlaylist.data.name);
      setPlaylistNameInput(allVideosFromPlaylist.data.name);
      setVideosOfPlaylist(allVideosFromPlaylist.data.video);
      // console.log(allVideosFromPlaylist);
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberOfPlaylist = async () => {
    try {
      // console.log(childId);

      if (!childId) {
        return;
      }

      const allPlaylistRequest = await service.get("playlist/all/" + childId);

      // console.log(allPlaylistRequest.data.length);

      if (allPlaylistRequest.data.length > 1) {
        setCanDeletePlaylist(true);
        setIsPageLoading(false);
      }
    } catch (error) {
      setIsPageLoading(false);
      console.log(error);
    }
  };

  const handleAddVideo = async () => {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    event.preventDefault();
    if (addVideo === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    const splitURL = addVideo.split("&");
    console.log(splitURL);

    try {
      const newVideo = await service.post("/video/new/", {
        link: splitURL[0],
        playlistId: playlistId,
      });
      setAddVideo("");

      console.log(newVideo);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await service.delete("/video/" + videoId);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handelActiveButton = () => {
    setActiveEditName(true);
  };

  const handelSaveEditName = async () => {
    event.preventDefault();
    let validRequest = true;

    if (!playlistNameInput) {
      setBlancFieldsErrorMessage("All fields are required");
      validRequest = false;
    } else {
      setBlancFieldsErrorMessage(false);
    }

    if (!validRequest) {
      return;
    }

    try {
      await service.put("/playlist/name/" + playlistId, {
        name: playlistNameInput,
      });
    } catch (error) {
      console.log(error);
    }

    setBackUpPlaylistName(playlistNameInput);

    setActiveEditName(false);

    // getData();
  };

  const handelCancelEditName = () => {
    setActiveEditName(false);
    setPlaylistNameInput(backUpPlaylistName);
  };

  const handelEditNameInput = (event) => {
    setPlaylistNameInput(event.target.value);
  };

  const handleDeletePlaylist = async () => {
    event.preventDefault();
    try {
      await service.delete("/playlist/" + playlistId);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div>
      {activeEditName === true ? (
        <div>
          <form>
            {/* <label htmlFor="name">Choose A New Name</label> */}
            <TextField
              label="Playlist Name"
              type="text"
              onChange={handelEditNameInput}
              name="name"
              value={playlistNameInput}
            ></TextField>
            <Button variant="contained" onClick={handelSaveEditName}>
              Save
            </Button>
            <Button variant="contained" onClick={handelCancelEditName}>
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{playlistNameInput}</h1>
          <Button variant="contained" onClick={handelActiveButton}>
            Edit Name
          </Button>
        </div>
      )}
      {blancFieldsErrorMessage && (
        <Alert severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}

      {videosOfPlaylist &&
        videosOfPlaylist.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ParentPlayer url={eachVideo.link} />

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteVideo(eachVideo._id);
                }}
              >
                {" "}
                Delete
              </Button>
            </div>
          );
        })}
      <form>
        {/* <label htmlFor="name">Video Link</label> */}
        <TextField
          label="New Video Link"
          type="text"
          name="name"
          value={addVideo}
          onChange={() => {
            setAddVideo(event.target.value);
            // console.log(event.target.value);
          }}
        ></TextField>

        <Button variant="contained" onClick={handleAddVideo}>
          Add{" "}
        </Button>
        {inputErrorMessage && (
          <Alert severity="error">
            {inputErrorMessage}
            <br />
          </Alert>
        )}
      </form>
      <br />
      <br />

      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <br />

      {canDeletePlaylist && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDeletePlaylist}
        >
          Delete This Playlist
        </Button>
      )}
    </div>
  );
}

export default VideoEdit;
