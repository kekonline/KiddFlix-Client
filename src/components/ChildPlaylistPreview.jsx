import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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
    borderRadius: "30px",
  };

  const player = {
    position: "relative",
  };

  const ContainerPlayer = {
    overflow: "hidden",
    backgroundColor: "black",
    width: "700px",
    height: "400px",
    borderRadius: "30px",
  };

  return (
    <div className="mainContainer">
      <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
        {" "}
        <div style={topLayer}>
          <h1 style={{ fontSize: "4rem" }}>{props.playlistName}</h1>

          <Button variant="outlined"> See More</Button>
        </div>
        <div style={ContainerPlayer}>
          <ReactPlayer url={url} width="700px" height="400px" style={player} />
        </div>
        <br />{" "}
      </Link>
    </div>
  );
}

export default ChildPlaylistPreview;
