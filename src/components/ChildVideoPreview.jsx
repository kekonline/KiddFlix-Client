import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function ChildVideoPreview(props) {
  // console.log(props);
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  let width = 700;
  let height = 400;

  if (window.innerWidth < 800) {
    width = window.innerWidth * 0.9;
    height = (width * 9) / 16;
  }

  useEffect(() => {
    setLink(encodeURIComponent(props.link));
  });

  const topLayer = {
    color: "white",
    position: "absolute",
    width: width + "px",
    height: height + "px",
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
    width: width + "px",
    height: height + "px",
    borderRadius: "30px",
  };

  return (
    <div>
      <Link to={`/playlist/video/${link}/${props._id}`}>
        <div style={topLayer}></div>
      </Link>
      <div style={ContainerPlayer}>
        <ReactPlayer
          url={props.link}
          width={width}
          height={height}
          style={player}
        />
      </div>
      <br />
      <div className="mainContainer">
        <br />
        <br />
        <Button
          variant="contained"
          onClick={() => (event.preventDefault(), navigate(-1))}
        >
          Back
        </Button>
      </div>
      <br /> <br /> <br /> <br />
    </div>
  );
}

export default ChildVideoPreview;
