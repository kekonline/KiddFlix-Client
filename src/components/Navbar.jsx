import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { Button } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import StarIcon from "@mui/icons-material/Star";

function Navbar() {
  const navigate = useNavigate();
  const {
    parentIsActive,
    setParentIsActive,
    childIsActive,
    setChildIsActive,
    profilePicture,
  } = useContext(AuthContext);
  // console.log(parentIsActive);

  let smallScreen = false;
  if (window.innerWidth < 700) {
    smallScreen = true;
  }

  useEffect(() => {
    getData();
  });

  const handleParentExit = () => {
    setParentIsActive(false);
    setChildIsActive(true);
    navigate("/playlist");
  };

  const handleLogout = () => {
    setParentIsActive(false);
    setChildIsActive(false);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true
      ? activeStyles
      : { textDecoration: "none" };
  };

  const activeStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    padding: "3px",
    textDecoration: "none",
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
              <Button variant="text" size="small" color="secondary">
                <NavLink to="/parent/home" style={toggleStyles}>
                  Manage Childs
                </NavLink>
              </Button>
            </div>
            <div>
              <Button variant="text" size="small" color="secondary">
                <NavLink to="/parent/profile" style={toggleStyles}>
                  Your Profile
                </NavLink>{" "}
              </Button>
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
            <NavLink to="/video/favorite" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                favorites
              </Button>
            </NavLink>

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
            <NavLink to="/video/favorite" style={toggleStyles}>
              <Button variant="text" size="small" color="secondary">
                <StarIcon />
              </Button>
            </NavLink>
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
