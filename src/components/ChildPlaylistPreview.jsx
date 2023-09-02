import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function ChildPlaylistPreview(props) {
  const [url, setUrl] = useState("");
  // console.log(props);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const firstVideoFromPlaylistRequest = await service.get(
        "playlist/oneVideo/" + props.playlistId
      );
      // console.log(firstVideoFromPlaylistRequest.data);
      setUrl(firstVideoFromPlaylistRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const topLayer = {
    color: "white",
    position: "absolute",
    width: "700px",
    height: "400px",
    zIndex: "1",
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50px",
  };

  const player = {
    position: "relative",
  };

  const ContainerPlayer = {
    overflow: "hidden",
    backgroundColor: "black",
    width: "700px",
    height: "400px",
    borderRadius: "50px",
  };

  return (
    <div>
      <div style={topLayer}>
        <h1>{props.playlistName}</h1>
        <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
          <button>See More</button>
        </Link>
      </div>
      <div style={ContainerPlayer}>
        <ReactPlayer
          url={url}
          volume={0.5}
          width="700px"
          height="400px"
          style={player}
        />
      </div>
    </div>
  );
}

export default ChildPlaylistPreview;
