import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingPic from "../../src/assets/Static_TV.gif";

function ChildPlaylistPreview(props) {
  const [isPageloading, setIsPageLoading] = useState(true);
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
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
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

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="mainContainer">
        <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
          <div style={topLayer}>
            <h1 style={{ fontSize: "4rem" }}>{props.playlistName}</h1>

            <Button variant="outlined"> See More</Button>
          </div>
          <div style={ContainerPlayer}>
            <img width="700px" height="400px" src={LoadingPic} />;
          </div>
          <br />
        </Link>
      </div>
    );
    // }, 1000);
  }

  return (
    <div className="mainContainer">
      <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
        <div style={topLayer}>
          <h1 style={{ fontSize: "4rem" }}>{props.playlistName}</h1>

          <Button variant="outlined"> See More</Button>
        </div>
        <div style={ContainerPlayer}>
          <ReactPlayer url={url} width="700px" height="400px" style={player} />
        </div>
        <br />
      </Link>
    </div>
  );
}

export default ChildPlaylistPreview;
