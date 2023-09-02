import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";

function ParentHome() {
  const [childsOfParent, setChildsOfParent] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestChildsOfParent = await service.get("child/all/");
      setChildsOfParent(requestChildsOfParent.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(childsOfParent);

  return (
    <div>
      {childsOfParent !== null &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <h3>{eachChild.name}</h3>
              <Link
                to={`/parent/playlist/edit/${eachChild.name}/${eachChild._id}`}
              >
                <button> Manage Playlist </button>
              </Link>
            </div>
          );
        })}
      <br /> <br /> <br /> <br />
      <p>Manage Kids:</p>
      <Link to="/parent/child/edit">
        <button>Manage</button>
      </Link>
    </div>
  );
}

export default ParentHome;
