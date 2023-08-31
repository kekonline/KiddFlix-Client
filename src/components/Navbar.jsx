import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/parent/home">Parent Home</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
