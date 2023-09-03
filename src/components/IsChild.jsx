import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsChild(props) {
  const { childIsActive } = useContext(AuthContext);

  if (childIsActive === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsChild;
