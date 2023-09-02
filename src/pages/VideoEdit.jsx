import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import ParentPlayer from "../components/ParentPlayer";

function VideoEdit() {
  const { playlistName, playlistId } = useParams();
  const [videosOfPlaylist, setVideosOfPlaylist] = useState(null);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [addVideo, setAddVideo] = useState("");
  const [activeEditName, setActiveEditName] = useState(false);
  const [playlistNameInput, setPlaylistNameInput] = useState("");
  const [backUpPlaylistName, setBackUpPlaylistName] = useState("");
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allVideosFromPlaylist = await service.get(
        "playlist/videos/" + playlistId
      );
      // console.log(playlistId);
      setBackUpPlaylistName(allVideosFromPlaylist.data.name);
      setPlaylistNameInput(allVideosFromPlaylist.data.name);
      setVideosOfPlaylist(allVideosFromPlaylist.data.video);
      // console.log(allVideosFromPlaylist);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddVideo = async () => {
    event.preventDefault();
    if (addVideo === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newVideo = await service.post("/video/new/", {
        link: addVideo,
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

  return (
    <div>
      {activeEditName === true ? (
        <div>
          <form>
            <label htmlFor="name">Choose A New Name</label>
            <input
              type="text"
              onChange={handelEditNameInput}
              name="name"
              value={playlistNameInput}
            ></input>
            <button onClick={handelSaveEditName}>Save</button>
            <button onClick={handelCancelEditName}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{playlistNameInput}</h1>
          <button onClick={handelActiveButton}>Edit Name</button>
        </div>
      )}
      {blancFieldsErrorMessage && (
        <p>
          {blancFieldsErrorMessage}
          <br />
        </p>
      )}

      {videosOfPlaylist &&
        videosOfPlaylist.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ParentPlayer url={eachVideo.link} />

              <button
                onClick={() => {
                  handleDeleteVideo(eachVideo._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      <form>
        <label htmlFor="name">Video Link</label>
        <input
          type="text"
          name="name"
          value={addVideo}
          onChange={() => {
            setAddVideo(event.target.value);
            // console.log(event.target.value);
          }}
        ></input>
        <br />
        <button onClick={handleAddVideo}>Add </button>
        {inputErrorMessage && (
          <p>
            {inputErrorMessage}
            <br />
          </p>
        )}
      </form>
      <br />
      <br />

      <br />

      <br />
      <br />
      <br />
      <button onClick={handleDeletePlaylist}>Delete This Playlist</button>
    </div>
  );
}

export default VideoEdit;
