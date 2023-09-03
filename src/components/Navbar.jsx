import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import service from "../services/service.config";
import { Button } from "@mui/material";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const {
    parentIsActive,
    setParentIsActive,
    childIsActive,
    setChildIsActive,
    setActiveChildId,
  } = useContext(AuthContext);
  // console.log(parentIsActive);

  // const [childsOfParent, ] = useState(null);

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
      console.log("childId from navbar", ChildId.data[0]._id);
      setActiveChildId(ChildId.data[0]._id);
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
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    padding: "3px",
  };

  const inActiveStyles = {};

  // console.log("parentIsActive", parentIsActive);
  // console.log("childIsActive", childIsActive);
  return (
    <div>
      <nav>
        {parentIsActive === true ? (
          <div className="ParentNavBar">
            <div>
              <NavLink onClick={handleParentExit} end={true}>
                <Button variant="text" size="small" color="error">
                  Exit Parent Mode
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/parent/home" end={true} style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Manage Childs
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/parent/profile" end={true} style={toggleStyles}>
                <Button variant="text" size="small" color="secondary">
                  Your Profile
                </Button>
              </NavLink>
            </div>
            <div>
              <NavLink onClick={handleLogout} end={true}>
                <Button variant="text" size="small" color="primary">
                  Log Out
                </Button>
              </NavLink>
            </div>
          </div>
        ) : null}
        {childIsActive === true ? (
          <div>
            <NavLink to="/playlist">PlayLists</NavLink>
            <NavLink to="/video/latest">New Videos</NavLink>
            <NavLink to="/video/random">Random Videos</NavLink>
            <NavLink to="/video/unwatched">Un Watched</NavLink>
            <NavLink to="/users-profile">Users Profile</NavLink>
          </div>
        ) : null}
        {parentIsActive === false && childIsActive === false ? (
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default Navbar;
