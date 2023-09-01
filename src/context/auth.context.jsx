import { useState, useEffect, createContext } from "react";
import service from "../services/service.config";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [parentId, setParentId] = useState(null);
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [parentIsActive, setParentIsActive] = useState(false);
  const [isPageloading, setIsPageLoading] = useState(true);

  useEffect(() => {
    verifyToken();

    if (parentIsActive === true) {
    }

    return () => {
      updateParentChilds();
    };
  }, []);

  useEffect(() => {}, []);

  const updateParentChilds = async () => {
    console.log(parentId);
    try {
      const updatedParentChilds = await service.get("child/all/" + parentId);
      // console.log(updatedParentChilds);
      setChildsOfParent(updatedParentChilds.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    setIsPageLoading(true);

    try {
      const verifySession = await service.get("/auth/verify");
      // console.log(verifySession);
      // console.log("session", verifySession.data._id);
      setParentId(verifySession.data._id);
      // console.log("parent", parentId);
      setParentIsActive(true);
      setIsPageLoading(false);
    } catch (error) {
      console.log("token error", error);
      setParentId(null);
      setChildsOfParent(null);
      setParentIsActive(false);
      setIsPageLoading(false);
    }
  };

  const passedContext = {
    parentId,
    childsOfParent,
    parentIsActive,
    verifyToken,
    updateParentChilds,
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
