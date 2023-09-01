import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function ChildEdit() {
  const { parentId, childsOfParent, updateParentChilds } =
    useContext(AuthContext);
  const [addChild, setAddChild] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const handleAddChild = async () => {
    event.preventDefault();
    if (addChild === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newChild = await service.post("/child/new/" + parentId, {
        name: addChild,
      });
      setAddChild("");
      updateParentChilds();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChild = async (childId) => {
    event.preventDefault();
    try {
      const deleteChildRequest = await service.delete("/child/" + childId);
      console.log("good", deleteChildRequest, childId);
      updateParentChilds();
      // navigate("/parent/profile");
    } catch (error) {
      console.log(error);
    }
  };

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
