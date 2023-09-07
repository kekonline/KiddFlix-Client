import { useState, useEffect, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";

//this page will be shown when the child clicks on his profile picture to make him able to switch to another child in the profile or a parent to switch into parent mode again
function UsersProfile() {
  const navigate = useNavigate();
  const { setActiveChildId, setProfilePicture } = useContext(AuthContext);
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [parentInfo, setParentInfo] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //he will search for the information of the child and the current parents
  const getData = async () => {
    try {
      const allParentsChilds = await service.get("child/all/");
      setChildsOfParent(allParentsChilds.data);
      setIsPageLoading(false);
      // console.log(ChildId.data[0]._id);
      const parentInfoRequest = await service.get("/parent/");
      setParentInfo(parentInfoRequest.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  //here we will save the picture of the current user so the navbar gets updated
  const handleSwitchChild = (childId, picture) => {
    setActiveChildId(childId);
    setProfilePicture(picture);
    navigate("/playlist");
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

  // console.log(parentInfo);

  //here we will visualize all the profiles with the switch button we will let us switch from one profile to another
  return (
    <div className="mainContainer">
      <h2>Switch Users</h2>
      <br />
      {childsOfParent &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <div className="childCard">
                <h3>{eachChild.name}</h3>
                <img
                  className="profilePicture"
                  src={eachChild.picture}
                  alt="img"
                />
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSwitchChild(eachChild._id, eachChild.picture);
                  }}
                >
                  Switch
                </Button>
                <br />
              </div>
              <br />
            </div>
          );
        })}
      <br />
      <br />
      {parentInfo && (
        <div className="childCard">
          <h3>{parentInfo.name}</h3>
          <img className="profilePicture" src={parentInfo.picture} alt="img" />
          <br />
          <Link to="/parent-login">
            <Button variant="contained">Switch</Button>
          </Link>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default UsersProfile;
