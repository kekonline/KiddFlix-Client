import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

//we use this component so only childs can visualize these pages
function IsChild(props) {
  const { childIsActive } = useContext(AuthContext);

  if (childIsActive === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsChild;
