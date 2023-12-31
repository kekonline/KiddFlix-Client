import { useState, useEffect, createContext } from "react";
import service from "../services/service.config";
const AuthContext = createContext();
import LoadingPic from "../../src/assets/Loading.gif";

//here we do load of stuff let me explain what is going on
function AuthWrapper(props) {
  const [parentId, setParentId] = useState(null);
  const [parentIsActive, setParentIsActive] = useState(false);
  const [childIsActive, setChildIsActive] = useState(false);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [activeChildId, setActiveChildId] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  //on start we verify the token
  useEffect(() => {
    verifyToken();
  }, []);

  //if we get to token we set the user ID and the Child ID with its image if not we set active users to false and we kick them back to the home screen
  const verifyToken = async () => {
    setIsPageLoading(true);
    try {
      const verifySession = await service.get("/auth/verify");
      // console.log(verifySession);
      // console.log("session", verifySession.data._id);
      setParentId(verifySession.data._id);
      // console.log("parent", parentId);
      if (parentIsActive === true) {
        setChildIsActive(false);
      } else {
        setChildIsActive(true);
      }
      const ChildId = await service.get("child/all/");
      // console.log(ChildId.data[0]._id);
      setActiveChildId(ChildId.data[0]._id);
      setProfilePicture(ChildId.data[0].picture);
      //!only for dev purpouse
      // setParentIsActive(true);
      setIsPageLoading(false);
    } catch (error) {
      console.log("token error", error);
      setParentId(null);
      setParentIsActive(false);
      setIsPageLoading(false);
      setChildIsActive(false);
    }
  };

  // console.log("is child active", childIsActive);

  const passedContext = {
    parentId,
    parentIsActive,
    verifyToken,
    setChildIsActive,
    setParentIsActive,
    childIsActive,
    setActiveChildId,
    activeChildId,
    profilePicture,
    setProfilePicture,
  };

  // console.log("activeChildId", activeChildId);

  if (isPageloading === true) {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
  }

  // console.log("activeChildId", activeChildId);
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
