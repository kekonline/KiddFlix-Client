import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import ChildVideoPreview from "../components/ChildVideoPreview";
import ReactPlayer from "react-player";
import LoadingPic from "../../src/assets/Loading.gif";

//this page handles many video types as unwatched random favorites and latest in a dynamic way
function ChildVideoCategory() {
  const { category } = useParams();
  const { activeChildId } = useContext(AuthContext);
  const [videosOfCategory, setVideosOfCategory] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  //will update if the param category changes
  useEffect(() => {
    scrollToTop();
    getData();
    return () => {
      setIsPageLoading(true);
    };
  }, [category]);

  //here we will scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  //depending on the panel category we will receive one type of result from the backend or another
  const getData = async () => {
    try {
      const requestedVideos = await service.get(
        `/video/${category}/${activeChildId}`
      );
      //   console.log(requestedVideos.data);
      setVideosOfCategory(requestedVideos.data);

      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
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

  //we will first show it a title depending on the param we received and will display the videos receipt from the DB
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
