import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import service from "../services/service.config";
import { useEffect, useState } from "react";

function ChildVideoPlay() {
  const { link, videoId } = useParams();
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    if (window.innerWidth < 800) {
      setWidth(window.innerWidth * 0.9);
      setHeight((width * 9) / 16);
    }

    sendData();
  });

  const sendData = async () => {
    try {
      await service.put("/video/" + videoId, { watched: true });
      // console.log(firstVideoFromPlaylistRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <br />
      <br />
      <ReactPlayer url={link} width={width} height={height} playing controls />
    </div>
  );
}

export default ChildVideoPlay;
