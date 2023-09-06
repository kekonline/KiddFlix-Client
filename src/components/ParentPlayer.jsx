import ReactPlayer from "react-player";

function ParentPlayer({ url }) {
  const width = window.innerWidth * 0.6;
  const height = (width * 9) / 16;

  if (window.innerWidth < 800) {
    return (
      <div>
        <ReactPlayer url={url} controls width={width} height={height} />
      </div>
    );
  } else {
    return (
      <div>
        <ReactPlayer url={url} controls width="500px" height="300px" />
      </div>
    );
  }
}

export default ParentPlayer;
