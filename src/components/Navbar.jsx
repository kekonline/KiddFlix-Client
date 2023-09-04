import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { Button } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FiberNewIcon from "@mui/icons-material/FiberNew";

function Navbar() {
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const {
    parentIsActive,
    setParentIsActive,
    childIsActive,
    setChildIsActive,
    setActiveChildId,
  } = useContext(AuthContext);
  // console.log(parentIsActive);

  let smallScreen = false;
  if (window.innerWidth < 600) {
    smallScreen = true;
  }

  // const [childsOfParent, ] = useState(null);

  useEffect(() => {
    getData();
  });

  const handleParentExit = () => {
    setParentIsActive(false);
    setChildIsActive(true);
    getData();
    navigate("/playlist");
  };

  const getData = async () => {
    try {
      const ChildId = await service.get("child/all/");
      // setChildsOfParent(ChildId.data);
      // console.log("childId from navbar", ChildId.data[0]._id);
      setActiveChildId(ChildId.data[0]._id);
      setProfilePicture(ChildId.data[0].picture);
      // console.log(profilePicture);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setParentIsActive(false);

    setChildIsActive(false);

    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : null;
  };

  const activeStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    padding: "3px",
  };

  // console.log("parentIsActive", parentIsActive);
  // console.log("childIsActive", childIsActive);
  return (
    <div>
      <nav>
        {parentIsActive === true ? (
          <div className="ParentNavBar">
            <div>
              <NavLink onClick={handleParentExit}>
                <Button variant="text" size="small" color="error">
                  Exit Parent Mode
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/parent/home" style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Manage Childs
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/parent/profile" style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Your Profile
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={handleLogout}>
                <Button variant="text" size="small" color="primary">
                  Log Out
                </Button>
              </NavLink>
            </div>
          </div>
        ) : null}
        {childIsActive === true && smallScreen === false ? (
          <div className="ParentNavBar">
            <NavLink to="/playlist" style={toggleStyles}>
              <Button
                variant="text"
                size="small"
                color="secondary"
                className="childButton"
              >
                PlayLists
              </Button>
            </NavLink>

            <NavLink to="/video/latest" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                New Videos
              </Button>
            </NavLink>

            <NavLink to="/video/random" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                Random Videos
              </Button>
            </NavLink>

            <NavLink to="/video/unwatched" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                Un Watched
              </Button>
            </NavLink>

            <NavLink to="/users-profile" style={toggleStyles}>
              <Button variant="text" size="small" color="primary">
                <img src={profilePicture} className="microProfilePicture" />
                Users Profile
              </Button>
            </NavLink>
          </div>
        ) : null}
        {childIsActive === true && smallScreen === true ? (
          <div className="ParentNavBar">
            <NavLink to="/playlist" style={toggleStyles}>
              <Button
                variant="text"
                size="small"
                color="secondary"
                className="childButton"
              >
                <SubscriptionsIcon />
              </Button>
            </NavLink>

            <NavLink to="/video/latest" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                <FiberNewIcon />
              </Button>
            </NavLink>

            <NavLink to="/video/random" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                <ShuffleIcon />
              </Button>
            </NavLink>

            <NavLink to="/video/unwatched" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                <RemoveRedEyeIcon />
              </Button>
            </NavLink>

            <NavLink to="/users-profile" style={toggleStyles}>
              <Button variant="text" size="small" color="primary">
                <img src={profilePicture} className="microProfilePicture" />
              </Button>
            </NavLink>
          </div>
        ) : null}
        {parentIsActive === false && childIsActive === false ? (
          <div>
            <div className="ParentNavBar">
              <NavLink to="/" style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Home
                </Button>
              </NavLink>
              <NavLink to="/signin" style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Sign In
                </Button>
              </NavLink>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default Navbar;
