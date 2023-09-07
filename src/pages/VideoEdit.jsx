import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import ParentPlayer from "../components/ParentPlayer";
import { Alert, Button, TextField } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//this page was the most fun to do plus I'm really proud of how it came out
//the function of this page is to let the parent be able to edit a playlist and giving him many functional abilities
//the main functions of this page are
//changing the name of the playlist
//giving the user's ability to add links to YouTube pages and delete YouTube videos he doesn't want anymore
//the user will be able to delete the playlist if he has more than one
//the user will be recommended with videos of other users to add in his playlist with a simple click thank you to my teacher Jorge for providing this idea

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
  const [topVideosMostSeen, setTopVideosMostSeen] = useState(null);

  const navigate = useNavigate();

  //get the needed information as the videos of the current playlist will, the number of the playlists the child has for the ability to delete the playlist and videos that this child doesn't have and recommend them
  useEffect(() => {
    getData();
    getNumberOfPlaylist();
    getToVideoNotInThisChild();
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
      console.log(childId);
    } catch (error) {
      console.log(error);
    }
  };

  const getToVideoNotInThisChild = async () => {
    try {
      const top20VideosMostWatchedNotInThisChild = await service.get(
        "video/top20/" + childId
      );
      setTopVideosMostSeen(top20VideosMostWatchedNotInThisChild.data);
      // console.log(top20VideosMostWatchedNotInThisChild.data);
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      console.log(error);
    }
  };

  const getNumberOfPlaylist = async () => {
    try {
      // console.log(childId);
      if (!childId) {
        return;
      }
      // console.log("in data");
      const allPlaylistRequest = await service.get("playlist/all/" + childId);
      // console.log(allPlaylistRequest.data.length);
      if (allPlaylistRequest.data.length > 1) {
        setCanDeletePlaylist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //here we handle add a new video checking that is not an empty string plus we split the final part of the string as it only has the channel from YouTube and we don't need it
  const handleAddVideo = async () => {
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
      // console.log(newVideo);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // here we handle the delete videos and fit for new updated DB information
  const handleDeleteVideo = async (videoId) => {
    try {
      await service.delete("/video/" + videoId);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //here we handle when the parent clicks on a recommended video and we added to the current playlist Plus we update the information in both playlists
  const handleAddVideoFromTop = async (videoLink) => {
    try {
      const newVideo = await service.post("/video/new/", {
        link: videoLink,
        playlistId: playlistId,
      });
      // await service.delete("/video/" + videoId);
      getData();
      getToVideoNotInThisChild();
    } catch (error) {
      console.log(error);
    }
  };

  //we use this state to activate the text field to let the user edit the name of the playlist
  const handelActiveButton = () => {
    setActiveEditName(true);
  };

  //here we handle the save edit button checking for required information and updating the DB if all is correct
  //we also do more stuff
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
  };

  //we handle the cancel button in the edit name and put back its original value
  const handelCancelEditName = () => {
    setActiveEditName(false);
    setPlaylistNameInput(backUpPlaylistName);
  };

  //here we handle the input information of the name by the user
  const handelEditNameInput = (event) => {
    setPlaylistNameInput(event.target.value);
  };

  //here we handle the delete of the current playlist
  const handleDeletePlaylist = async () => {
    event.preventDefault();
    try {
      await service.delete("/playlist/" + playlistId);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  //Icon color for the add recommended video button
  const IconStyle = {
    color: "green",
  };

  if (isPageloading === true) {
    setTimeout(() => {
      return (
        <div className="loadingContainer">
          <img className="loadingImage" src={LoadingPic} />;
        </div>
      );
    }, 500);
  }

  //here we visualize all the edit playlist page the first section we manage if the title of the playlist or name can be edited or not and all the functions for it after we will display all the current play videos in the current playlist and after we will show the recommended videos that the child doesn't have if the user child has more than one playlist we will also show the delete button for the current playlist
  return (
    <div className="mainContainer">
      {activeEditName === true ? (
        <div className="playlistTitle">
          <form>
            {/* <label htmlFor="name">Choose A New Name</label> */}
            <TextField
              size="small"
              label="Playlist Name"
              type="text"
              onChange={handelEditNameInput}
              name="name"
              value={playlistNameInput}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handelSaveEditName();
                }
              }}
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
        <div className="playlistTitle">
          <h1>{playlistNameInput}</h1>
          <Button variant="contained" onClick={handelActiveButton}>
            Edit Name
          </Button>
        </div>
      )}
      <br />
      {blancFieldsErrorMessage && (
        <Alert variant="filled" severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
      {videosOfPlaylist &&
        videosOfPlaylist.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <div className="videoContainer">
                <ParentPlayer url={eachVideo.link} />

                <IconButton
                  onClick={() => {
                    handleDeleteVideo(eachVideo._id);
                  }}
                  aria-label="delete"
                  size="large"
                  color="error"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
              <br />
              <br />
            </div>
          );
        })}
      <form>
        <TextField
          size="small"
          label="New Video Link"
          type="text"
          name="name"
          value={addVideo}
          onChange={() => {
            setAddVideo(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleAddVideo();
            }
          }}
        ></TextField>
        <Button variant="contained" color="success" onClick={handleAddVideo}>
          Add
        </Button>
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
      </Button>
      <br />
      <br />
      <h1>Feeling Lazy Get A Shortcut</h1>
      <h2>Top Most Watched Videos In KiddFlix</h2>
      <br />
      <br />
      {topVideosMostSeen &&
        topVideosMostSeen.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <div className="videoContainer">
                <ParentPlayer url={eachVideo.link} />
                <IconButton
                  onClick={() => {
                    handleAddVideoFromTop(eachVideo.link);
                  }}
                  aria-label="delete"
                  size="large"
                >
                  <AddCircleIcon fontSize="inherit" style={IconStyle} />
                </IconButton>
              </div>
              <br />
              <br />
            </div>
          );
        })}
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
      <br />
      <br /> <br /> <br />
    </div>
  );
}

export default VideoEdit;
