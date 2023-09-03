import { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import ChildPlaylistPreview from "../components/ChildPlaylistPreview";
import ReactPlayer from "react-player";

function ChildPlaylist() {
  const { activeChildId } = useContext(AuthContext);
  const [allPlaylistsFromChild, setAllPlaylistsFromChild] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  // console.log("from ChildPlaylist", activeChildId);

  useEffect(() => {
    getData();
  }, [activeChildId]);

  const getData = async () => {
    if (!activeChildId) {
      return;
    }

    try {
      const allPlaylistsFromChildRequest = await service.get(
        "playlist/all/" + activeChildId
      );
      setIsPageLoading(false);
      setAllPlaylistsFromChild(allPlaylistsFromChildRequest.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div>
      {allPlaylistsFromChild &&
        allPlaylistsFromChild.map((eachPlaylist) => {
          return (
            <ChildPlaylistPreview
              key={eachPlaylist._id}
              playlistId={eachPlaylist._id}
              playlistName={eachPlaylist.name}
            />
          );
        })}
    </div>
  );
}

export default ChildPlaylist;
