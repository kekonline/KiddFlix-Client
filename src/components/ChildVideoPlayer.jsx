import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function ChildVideoPlay() {
  const { link } = useParams();

  return (
    <div>
      <ReactPlayer url={link} playing controls volume="0.5" />
    </div>
  );
}

export default ChildVideoPlay;
