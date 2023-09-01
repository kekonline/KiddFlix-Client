import { useState, useEffect, createContext } from "react";
import service from "../services/service.config";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [parentId, setParentId] = useState(null);
  const [parentIsActive, setParentIsActive] = useState(false);
  const [isPageloading, setIsPageLoading] = useState(true);
  const [childIsActive, setChildIsActive] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  // const updateParentChilds = async () => {
  //   console.log(parentId);
  //   try {
  //     const updatedParentChilds = await service.get("child/all/" + parentId);

  //     setChildsOfParent(updatedParentChilds.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

      setIsPageLoading(false);
    } catch (error) {
      console.log("token error", error);
      setParentId(null);
      setParentIsActive(false);
      setIsPageLoading(false);
      setChildIsActive(false);
    }
  };

  const passedContext = {
    parentId,
    parentIsActive,
    verifyToken,
    setChildIsActive,
    setParentIsActive,
    childIsActive,
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
