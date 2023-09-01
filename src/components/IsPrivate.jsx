import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { parentIsActive, childIsActive } = useContext(AuthContext);

  if (parentIsActive === true || childIsActive === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsPrivate;
