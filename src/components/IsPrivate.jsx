import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { parentIsActive } = useContext(AuthContext);

  if (parentIsActive === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsPrivate;