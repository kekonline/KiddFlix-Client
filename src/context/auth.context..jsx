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
  }, []);

  const verifyToken = async () => {
    setIsPageLoading(true);

    try {
      const verifySession = await service.get("/auth/verify");
      console.log(verifySession);

      setIsPageLoading(false);
    } catch (error) {
      //   console.log(error);
      //   setParentId(null);
      //   setChildsOfParent(null);
      //   setParentIsActive(false);
      //   setIsPageLoading(false);
    }
  };

  const passedContext = {
    parentId,
    childsOfParent,
    parentIsActive,
    verifyToken,
  };

  if (isPageloading === true) {
    return <h3>... Loaging Nice Stuff...</h3>;
  }

  return (
    <AuthWrapper.Provider value={passedContext}>
      {props.children}
    </AuthWrapper.Provider>
  );
}

export { AuthContext, AuthWrapper };
