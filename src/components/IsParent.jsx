import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsParent(props) {
  const { parentIsActive } = useContext(AuthContext);

  if (parentIsActive === true) {
    return <Navigate to="/parent/home" />;
    // return props.children;
  } else {
    return props.children;
  }
}

export default IsParent;
