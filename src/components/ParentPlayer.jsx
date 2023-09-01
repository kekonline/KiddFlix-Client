import ReactPlayer from "react-player";

function ParentPlayer({ url }) {
  return (
    <div>
      <ReactPlayer url={url} controls volume={0.5} />
    </div>
  );
}

export default ParentPlayer;
