import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";

//this is the parent's main page
function ParentHome() {
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //here we get the data of all the parents child
  const getData = async () => {
    try {
      const requestChildsOfParent = await service.get("child/all/");
      setChildsOfParent(requestChildsOfParent.data);
      // console.log(requestChildsOfParent.data);
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      console.log(error);
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
  // console.log(childsOfParent);
  //we will visualize all the parents' child with its images and name
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
      <br />
      <br /> <br />
      <br />
    </div>
  );
}

export default ParentHome;
