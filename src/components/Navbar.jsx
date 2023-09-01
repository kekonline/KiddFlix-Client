import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { parentIsActive, setParentIsActive, childIsActive, setChildIsActive } =
    useContext(AuthContext);
  // console.log(parentIsActive);

  const handleParentExit = () => {
    setParentIsActive(false);
    setChildIsActive(true);
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
