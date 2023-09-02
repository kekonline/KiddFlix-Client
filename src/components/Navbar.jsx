import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import service from "../services/service.config";

function Navbar() {
  const navigate = useNavigate();
  const {
    parentIsActive,
    setParentIsActive,
    childIsActive,
    setChildIsActive,
    setActiveChildId,
    setChildsOfParent,
  } = useContext(AuthContext);
  // console.log(parentIsActive);

  // const [childsOfParent, ] = useState(null);

  const handleParentExit = () => {
    setParentIsActive(false);
    setChildIsActive(true);
    getData();
  };

  const getData = async () => {
    try {
      const ChildId = await service.get("child/all/");
      setChildsOfParent(ChildId.data);
      // console.log(ChildId.data[0]._id);
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

  // console.log("parentIsActive", parentIsActive);
  // console.log("childIsActive", childIsActive);
  return (
    <div>
      <nav>
        {parentIsActive === true ? (
          <div>
            <NavLink to="/parent/home">Manage Childs</NavLink>
            <NavLink to="/playlist" onClick={handleParentExit}>
              Exit Parent Mode
            </NavLink>

            <NavLink to="/parent/profile">Your Profile</NavLink>
            <br />

            <NavLink onClick={handleLogout}>Log Out</NavLink>
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
