import { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import ChildPlaylistPreview from "../components/ChildPlaylistPreview";

function ChildPlaylist() {
  const { activeChildId } = useContext(AuthContext);
  const [allPlaylistsFromChild, setAllPlaylistsFromChild] = useState(null);

  // console.log(activeChildId);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allPlaylistsFromChildRequest = await service.get(
        "playlist/all/" + activeChildId
      );

      setAllPlaylistsFromChild(allPlaylistsFromChildRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {allPlaylistsFromChild &&
        allPlaylistsFromChild.map((eachPlaylist) => {
          return (
            <ChildPlaylistPreview
              key={eachPlaylist._id}
              playlistId={eachPlaylist._id}
            />
          );
        })}
    </div>
  );
}

export default ChildPlaylist;
