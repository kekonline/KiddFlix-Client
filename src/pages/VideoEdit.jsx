import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import ParentPlayer from "../components/ParentPlayer";

function VideoEdit() {
  const { playlistName, playlistId } = useParams();
  const [videosOfPlaylist, setVideosOfPlaylist] = useState(null);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [addVideo, setAddVideo] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allVideosFromPlaylist = await service.get(
        "playlist/videos/" + playlistId
      );
      // console.log(playlistId);
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

  return (
    <div>
      <h1>{playlistName}</h1>
      {videosOfPlaylist &&
        videosOfPlaylist.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ParentPlayer url={eachVideo.link} />
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
    </div>
  );
}

export default VideoEdit;
