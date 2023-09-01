import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function ParentHome() {
  const { childsOfParent } = useContext(AuthContext);

  // console.log(childsOfParent);

  return (
    <div>
      <p>Edit your profile</p>
      <Link to="/parent/profile">
        <button>Edit</button>
      </Link>
      <br />
      <p>Manage Kids:</p>
      <Link to="/parent/child/edit">
        <button>Manage</button>
      </Link>
      <br />

      {childsOfParent !== null &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <h3>{eachChild.name}</h3>
              <button to={`/parent/playlist/edit/${eachChild._id}`}>
                Manage Playlist
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default ParentHome;
