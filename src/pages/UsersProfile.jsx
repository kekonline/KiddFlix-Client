import { useState, useEffect, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";

function UsersProfile() {
  const navigate = useNavigate();
  const { setActiveChildId } = useContext(AuthContext);
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [parentInfo, setParentInfo] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

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

  const handleSwitchChild = (childId) => {
    setActiveChildId(childId);

    navigate("/playlist");
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 500);
  }

  // console.log(parentInfo);

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
                    handleSwitchChild(eachChild._id);
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
