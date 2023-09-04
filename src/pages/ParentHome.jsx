import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { Button } from "@mui/material";

function ParentHome() {
  const [childsOfParent, setChildsOfParent] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestChildsOfParent = await service.get("child/all/");
      setChildsOfParent(requestChildsOfParent.data);
      console.log(requestChildsOfParent.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(childsOfParent);

  return (
    <div className="mainContainer">
      <br /> <br />
      {childsOfParent !== null &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <div className="childCard">
                <h2>{eachChild.name}</h2>
                <img
                  className="profilePicture"
                  src={eachChild.picture}
                  alt="img"
                />
                <br />
                <Link
                  to={`/parent/playlist/edit/${eachChild.name}/${eachChild._id}`}
                >
                  <Button variant="contained">
                    Manage {eachChild.name}'s Playlist
                  </Button>
                </Link>
              </div>
              <br />
            </div>
          );
        })}
      <br /> <br /> <br />
      <div className="childCard mainContainer">
        <p>Manage You Childs</p>
        <Link to="/parent/child/edit">
          <Button variant="contained">Manage</Button>
        </Link>
      </div>
    </div>
  );
}

export default ParentHome;
