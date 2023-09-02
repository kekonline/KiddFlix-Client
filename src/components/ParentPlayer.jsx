import ReactPlayer from "react-player";

function ParentPlayer({ url }) {
  return (
    <div>
      <ReactPlayer url={url} controls width="500px" height="300px" />
    </div>
  );
}

export default ParentPlayer;
