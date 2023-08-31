import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { parentIsActive } = useContext(AuthContext);
  // console.log(parentIsActive);
  return (
    <div>
      <nav>
        {parentIsActive === true ? (
          <NavLink to="/parent/home">Parent Home</NavLink>
        ) : (
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
