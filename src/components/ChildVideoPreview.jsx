import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPic from "../../src/assets/Static_TV.gif";

function ChildVideoPreview(props) {
  const [isPageloading, setIsPageLoading] = useState(true);
  // console.log(props);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(encodeURIComponent(props.link));

    setIsPageLoading(false);
  });

  const topLayer = {
    color: "white",
    position: "absolute",
    width: "700px",
    height: "400px",
    zIndex: "1",
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
    <div>
      <Link to={`/playlist/video/${link}/${props._id}`}>
        <div style={topLayer}></div>
      </Link>
      <div style={ContainerPlayer}>
        <ReactPlayer
          url={props.link}
          width="700px"
          height="400px"
          style={player}
        />
      </div>
      <br />
    </div>
  );
}

export default ChildVideoPreview;
