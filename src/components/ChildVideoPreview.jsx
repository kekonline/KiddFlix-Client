import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPic from "../../src/assets/Static_TV.gif";
//this component creates the child preview which after leads to the child player
function ChildVideoPreview(props) {
  // console.log(props);
  const [link, setLink] = useState("");
  const [isPageloading, setIsPageLoading] = useState(true);
  let width = 700;
  let height = 400;

  if (window.innerWidth < 800) {
    width = window.innerWidth * 0.9;
    height = (width * 9) / 16;
  }

  useEffect(() => {
    setLink(encodeURIComponent(props.link));
    setTimeout(() => {
      setIsPageLoading(false);
    }, Math.floor(Math.random() * (3000 - 800 + 1)) + 800);

    // return () => {
    //   setIsPageLoading(true);
    // };
  }, []);

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
      {isPageloading && (
        <img width={width} height={height} src={LoadingPic} style={topLayer} />
      )}
      <div style={ContainerPlayer}>
        <ReactPlayer
          url={props.link}
          width={width}
          height={height}
          style={player}
        />
      </div>
      <br />
      <div className="mainContainer"></div>
      <br /> <br /> <br />
    </div>
  );
}

export default ChildVideoPreview;
