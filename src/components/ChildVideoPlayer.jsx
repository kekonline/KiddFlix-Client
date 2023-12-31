import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import service from "../services/service.config";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Alert } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import { Button } from "@mui/material";

//this component is the child video player well he will be able to add to favorites and we will Mark as watched
function ChildVideoPlay() {
  const { link, videoId } = useParams();
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(400);
  const [filledStar, setFilledStar] = useState(false);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [addMessageTrigger, setAddMessageTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 800) {
      setWidth(window.innerWidth * 0.65);
      setHeight((window.innerWidth * 9 * 0.65) / 16);
    }
    sendData();
  }, []);

  const IconStyle = {
    color: "yellow",
    fontSize: "3rem",
  };

  const alertStyle = {
    fontSize: "1rem",
  };

  //here we check if the video has started or not
  const sendData = async () => {
    try {
      const CheckForStar = await service.put("/video/" + videoId, {
        watched: true,
      });
      // console.log(CheckForStar.data.favorite);
      setFilledStar(CheckForStar.data.favorite);
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      console.log(error);
    }
  };

  //here we handle the favorite when the child passes the button and we update the DB
  const handleAddToFavorites = async () => {
    setFilledStar(!filledStar);
    try {
      const updateStar = await service.put("/video/star/" + videoId, {
        favorite: !filledStar,
      });
      // console.log(updateStar);
    } catch (error) {
      console.log(error);
    }
    if (!filledStar) {
      setAddMessageTrigger("Added to favorites");
    } else {
      setAddMessageTrigger("Removed from favorites");
    }
    setTimeout(() => {
      setAddMessageTrigger("");
    }, 1500);
  };

  if (isPageloading === true) {
    setTimeout(() => {
      return (
        <div className="loadingContainer">
          <img className="loadingImage" src={LoadingPic} />;
        </div>
      );
    }, 500);
  }

  // console.log(filledStar);

  return (
    <div className="mainContainer">
      <br /> <br />
      <br />
      <br />
      <ReactPlayer url={link} width={width} height={height} playing controls />
      <br />
      <br />
      <IconButton size="large" onClick={handleAddToFavorites}>
        {filledStar ? (
          <StarIcon fontSize="inherit" color="action" style={IconStyle} />
        ) : (
          <StarBorderIcon fontSize="inherit" color="action" style={IconStyle} />
        )}
      </IconButton>
      <br />
      {addMessageTrigger && (
        <Alert variant="outlined" severity="success" style={alertStyle}>
          {addMessageTrigger}
          <br />
        </Alert>
      )}
      <br />
      <Button
        variant="contained"
        onClick={() => (event.preventDefault(), navigate(-1))}
      >
        Back
      </Button>{" "}
      <br /> <br /> <br /> <br />
    </div>
  );
}

export default ChildVideoPlay;
