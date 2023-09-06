import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import ChildVideoPreview from "../components/ChildVideoPreview";
import ReactPlayer from "react-player";
import LoadingPic from "../../src/assets/Loading.gif";

function ChildVideoCategory() {
  const { category } = useParams();
  const { activeChildId } = useContext(AuthContext);
  const [videosOfCategory, setVideosOfCategory] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [category]);

  const getData = async () => {
    try {
      const requestedVideos = await service.get(
        `/video/${category}/${activeChildId}`
      );
      //   console.log(requestedVideos.data);
      setVideosOfCategory(requestedVideos.data);
      setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  // console.log("video of category", videosOfCategory);

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 500);
  }

  return (
    <div className="mainContainer">
      {category === "random" && <h1>Random Videos</h1>}
      {category === "unwatched" && <h1>Un Watched Videos</h1>}
      {category === "latest" && <h1>Latest Videos</h1>}
      {category === "favorite" && <h1>Favorites</h1>}
      {videosOfCategory &&
        videosOfCategory.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ChildVideoPreview link={eachVideo.link} _id={eachVideo._id} />
            </div>
          );
        })}
      <br /> <br />
    </div>
  );
}

export default ChildVideoCategory;
