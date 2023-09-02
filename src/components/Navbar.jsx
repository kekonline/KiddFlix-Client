import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import service from "../services/service.config";

function Navbar() {
  const {
    parentIsActive,
    setParentIsActive,
    childIsActive,
    setChildIsActive,
    setActiveChildId,
  } = useContext(AuthContext);
  // console.log(parentIsActive);

  const [childsOfParent, setChildsOfParent] = useState(null);

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

  // console.log("parentIsActive", parentIsActive);
  // console.log("childIsActive", childIsActive);
  return (
    <div>
      <nav>
        {parentIsActive === true ? (
          <div>
            <NavLink to="/parent/home">Parent Home</NavLink>
            <NavLink to="/playlist" onClick={handleParentExit}>
              Exit Parent Mode
            </NavLink>
          </div>
        ) : null}
        {childIsActive === true ? (
          <div>
            <NavLink to="/playlist">PlayLists</NavLink>
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
