import { useState, useEffect, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function UsersProfile() {
  const navigate = useNavigate();
  const { setActiveChildId } = useContext(AuthContext);
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [parentInfo, setParentInfo] = useState(null);
  const [isPageloading, setIsPageLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allParentsChilds = await service.get("child/all/");
      setChildsOfParent(allParentsChilds.data);
      setIsPageLoading(false);
      // console.log(ChildId.data[0]._id);
      const parentInfoRequest = await service.get("/parent/");
      setParentInfo(parentInfoRequest.data);
    } catch (error) {
      console.log(error);
      setIsPageLoading(false);
    }
  };

  const handleSwitchChild = (childId) => {
    setActiveChildId(childId);

    navigate("/playlist");
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  // console.log(parentInfo);

  return (
    <div>
      <h2>Switch Users</h2>
      {childsOfParent &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <h3>{eachChild.name}</h3>
              <button
                onClick={() => {
                  handleSwitchChild(eachChild._id);
                }}
              >
                Switch
              </button>

              <br />
            </div>
          );
        })}
      {parentInfo && (
        <div>
          <h3>{parentInfo.name}</h3>
          <Link to="/parent-login">
            <button>Switch</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UsersProfile;
