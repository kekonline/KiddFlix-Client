import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../services/service.config";

function PlaylistEdit() {
  const { childName, childId } = useParams();
  const [playlistOfChild, setPlaylistOfChild] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [addPlayList, setAddPlayList] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allPlaylistsFromChild = await service.get(
        "playlist/all/" + childId
      );
      setIsPageLoading(false);
      setPlaylistOfChild(allPlaylistsFromChild.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  const handleAddPlaylist = async () => {
    event.preventDefault();
    if (addPlayList === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newPlaylist = await service.post("/playlist/new/" + childId, {
        name: addPlayList,
      });
      setAddPlayList("");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(playlistOfChild);

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div>
      <h2>{childName}</h2>

      {playlistOfChild &&
        playlistOfChild.map((eachPlaylist) => {
          return (
            <div key={eachPlaylist._id}>
              <Link
                to={`/parent/video/edit/${eachPlaylist.name}/${eachPlaylist._id}`}
              >
                <button> {eachPlaylist.name}</button>
              </Link>
            </div>
          );
        })}

      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={addPlayList}
          onChange={() => {
            setAddPlayList(event.target.value);
            // console.log(event.target.value);
          }}
        ></input>
        <br />
        <button onClick={handleAddPlaylist}>Add </button>
        {inputErrorMessage && (
          <p>
            {inputErrorMessage}
            <br />
          </p>
        )}
      </form>
    </div>
  );
}

export default PlaylistEdit;
