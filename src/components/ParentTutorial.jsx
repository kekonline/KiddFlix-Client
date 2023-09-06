import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ParentTutorial() {
  const navigate = useNavigate();
  const width = window.innerWidth * 0.9;
  const height = (width * 9) / 16;

  if (window.innerWidth < 800) {
    return (
      <div className="mainContainer">
        <br />
        <br />
        <div className="childCard">
          <br />

          <h1>Watch KiddFlix Tutorial Video</h1>

          <br />
          <ReactPlayer
            url="https://youtu.be/1L1koATTSSM"
            controls
            width={width}
            height={height}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => (event.preventDefault(), navigate("/parent/home"))}
          >
            Back
          </Button>
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainContainer">
        <br />
        <br />
        <div className="childCard">
          <br />

          <h1>Watch KiddFlix Tutorial Video</h1>

          <br />
          <ReactPlayer
            url="https://youtu.be/1L1koATTSSM"
            controls
            width="700px"
            height="400px"
          />
          <br />
          <Button variant="contained" onClick={() => navigate("/parent/home")}>
            Back
          </Button>
          <br />
        </div>
        <br /> <br />
      </div>
    );
  }
}

export default ParentTutorial;
