import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ChildVideoPreview(props) {
  // console.log(props);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(encodeURIComponent(props.link));
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
    </div>
  );
}

export default ChildVideoPreview;
