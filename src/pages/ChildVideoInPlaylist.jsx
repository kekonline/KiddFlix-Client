import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import ChildVideoPreview from "../components/ChildVideoPreview";
import ReactPlayer from "react-player";
import LoadingPic from "../../src/assets/Loading.gif";

function ChildVideoInPlaylist() {
  const [playlistOfChild, setPlaylistOfChild] = useState(null);
  const { playlistName, playlistId } = useParams();
  const [videosOfPlaylist, setVideosOfPlaylist] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  //   console.log(playlistId, playlistName);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allVideosFromPlaylist = await service.get(
        "playlist/videos/" + playlistId
      );
      // console.log(playlistId);
      setVideosOfPlaylist(allVideosFromPlaylist.data.video);
      // console.log(allVideosFromPlaylist);
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 1000);
  }

  return (
    <div className="mainContainer">
      <h1>{playlistName}</h1>
      {videosOfPlaylist &&
        videosOfPlaylist.map((eachVideo) => {
          return (
            <div key={eachVideo._id}>
              <ChildVideoPreview link={eachVideo.link} _id={eachVideo._id} />
            </div>
          );
        })}
    </div>
  );
}

export default ChildVideoInPlaylist;
