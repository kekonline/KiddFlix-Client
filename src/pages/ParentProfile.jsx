import service from "../services/service.config";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
function ParentProfile() {
  const { parentId } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log(parentId);
      const parentInfo = await service.get("/parent/" + parentId);
      console.log(parentInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      ParentProfile
      <br />
      {parentId}
    </div>
  );
}

export default ParentProfile;
