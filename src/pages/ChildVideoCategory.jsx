import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import ChildVideoPreview from "../components/ChildVideoPreview";
import ReactPlayer from "react-player";

function ChildVideoCategory() {
  const { category } = useParams();
  const { activeChildId } = useContext(AuthContext);
  const [videosOfCategory, setVideosOfCategory] = useState(null);

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
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("video of category", videosOfCategory);

  return (
    <div className="mainContainer">
      {category === "random" && <h1>Random Videos</h1>}
      {category === "unwatched" && <h1>Un Watched Videos</h1>}
      {category === "latest" && <h1>Latest Videos</h1>}

      {videosOfCategory &&
        videosOfCategory.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ChildVideoPreview link={eachVideo.link} _id={eachVideo._id} />
            </div>
          );
        })}
      <br />
    </div>
  );
}

export default ChildVideoCategory;
