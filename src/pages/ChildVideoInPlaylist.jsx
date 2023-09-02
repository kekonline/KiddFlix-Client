import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import ChildVideoPreview from "../components/ChildVideoPreview";
import ReactPlayer from "react-player";
function ChildVideoInPlaylist() {
  const [playlistOfChild, setPlaylistOfChild] = useState(null);
  const { playlistName, playlistId } = useParams();
  const [videosOfPlaylist, setVideosOfPlaylist] = useState(null);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
