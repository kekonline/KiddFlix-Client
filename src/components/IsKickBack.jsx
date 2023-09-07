import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

//we use this component to kick back any user that is trying to go to the home screen or out of the main page
function IsKickBack(props) {
  const { parentIsActive, childIsActive } = useContext(AuthContext);
  if (parentIsActive === true) {
    return <Navigate to="/parent/home" />;
  } else if (childIsActive === true) {
    return <Navigate to="/playlist" />;
  } else {
    return props.children;
  }
}

export default IsKickBack;
