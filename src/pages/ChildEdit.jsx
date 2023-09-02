import { useEffect, useState } from "react";
// import { useEffect, useContext, useState } from "react";
// import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function ChildEdit() {
  const [isPageloading, setIsPageLoading] = useState(true);
  const [childsOfParent, setChildsOfParent] = useState(null);
  // const { updateParentChilds } = useContext(AuthContext);
  const [addChild, setAddChild] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestChildsOfParent = await service.get("child/all/");
      setChildsOfParent(requestChildsOfParent.data);
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChild = async () => {
    event.preventDefault();
    if (addChild === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newChild = await service.post("/child/new/", {
        name: addChild,
      });
      setAddChild("");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChild = async (childId) => {
    event.preventDefault();
    try {
      const deleteChildRequest = await service.delete("/child/" + childId);
      console.log("good", deleteChildRequest, childId);
      getData();
      // navigate("/parent/profile");
    } catch (error) {
      console.log(error);
    }
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div>
      ChildEdit
      {childsOfParent &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <h3>{eachChild.name}</h3>
              <button
                onClick={() => {
                  handleDeleteChild(eachChild._id);
                }}
              >
                Delete
              </button>

              <br />
            </div>
          );
        })}
      <br />
      {inputErrorMessage && (
        <p>
          {inputErrorMessage}
          <br />
        </p>
      )}
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={addChild}
          onChange={() => {
            setAddChild(event.target.value);
            // console.log(event.target.value);
          }}
        ></input>
        <br />
        <button onClick={handleAddChild}>Add </button>
        {inputErrorMessage && (
          <p>
            {inputErrorMessage}
            <br />
          </p>
        )}
      </form>
    </div>
  );
}

export default ChildEdit;
