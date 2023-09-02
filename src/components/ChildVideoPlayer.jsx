import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import service from "../services/service.config";
import { useEffect } from "react";

function ChildVideoPlay() {
  const { link, videoId } = useParams();

  useEffect(() => {
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
    <div>
      <ReactPlayer url={link} playing controls />
    </div>
  );
}

export default ChildVideoPlay;
