import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useParams, useNavigate } from "react-router-dom";

function ChildEditCard() {
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isPageloading, setIsPageLoading] = useState(true);
  const [oneChildInfo, setOneChildInfo] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const { childId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestOneChild = await service.get("child/" + childId);
      setOneChildInfo(requestOneChild.data);
      setNameInput(requestOneChild.data.name);
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChild = async (childId) => {
    event.preventDefault();
    try {
      const deleteChildRequest = await service.delete("/child/" + childId);
      console.log("good", deleteChildRequest, childId);

      navigate("/parent/child/edit/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleSave = async () => {
    event.preventDefault();
    if (nameInput === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newChild = await service.put("/child/" + oneChildInfo._id, {
        name: nameInput,
      });
      navigate("/parent/child/edit/");
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
      ChildEditCard
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" value={nameInput} onChange={handleInputChange} />
        <button onClick={handleSave}>Save</button>
        <button
          onClick={() => {
            navigate("/parent/child/edit/");
          }}
        >
          Cancel
        </button>
      </form>
      {inputErrorMessage && (
        <p>
          {inputErrorMessage}
          <br />
        </p>
      )}
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          handleDeleteChild(oneChildInfo._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ChildEditCard;
