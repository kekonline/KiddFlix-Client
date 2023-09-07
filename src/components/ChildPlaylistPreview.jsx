import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingPic from "../../src/assets/Static_TV.gif";

//this component creates the playlist preview for the child
function ChildPlaylistPreview(props) {
  const [isPageloading, setIsPageLoading] = useState(true);
  const [url, setUrl] = useState("");
  // console.log(props);
  let width = 700;
  let height = 400;

  if (window.innerWidth < 800) {
    width = window.innerWidth * 0.9;
    height = (width * 9) / 16;
  }

  useEffect(() => {
    getData();
  }, []);

  //here we get the necessary data
  const getData = async () => {
    try {
      const firstVideoFromPlaylistRequest = await service.get(
        "playlist/oneVideo/" + props.playlistId
      );
      // console.log(firstVideoFromPlaylistRequest.data);
      setUrl(firstVideoFromPlaylistRequest.data);
      setTimeout(() => {
        setIsPageLoading(false);
      }, Math.floor(Math.random() * (3000 - 800 + 1)) + 800);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  const topLayer = {
    color: "white",
    position: "absolute",
    width: width + "px",
    height: height + "px",
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
    width: width + "px",
    height: height + "px",
    borderRadius: "30px",
  };

  //we have to visualizations one while we're getting the data and one after the data is received
  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="mainContainer">
        <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
          <div style={topLayer}>
            <h1 className="playListName">{props.playlistName}</h1>
            <Button variant="none">See More See More</Button>
          </div>
          <div style={ContainerPlayer}>
            <img width={width} height={height} src={LoadingPic} />;
          </div>
          <br /> <br /> <br /> <br />
        </Link>
      </div>
    );
    // }, 500);
  }

  return (
    <div className="mainContainer">
      <Link to={`/playlist/${props.playlistName}/${props.playlistId}`}>
        <div style={topLayer}>
          <h1 className="playListName">{props.playlistName}</h1>
          <Button variant="none">See More</Button>
        </div>
        <div style={ContainerPlayer}>
          <ReactPlayer url={url} width={width} height={height} style={player} />
        </div>
        <br /> <br /> <br /> <br />
      </Link>
    </div>
  );
}

export default ChildPlaylistPreview;
