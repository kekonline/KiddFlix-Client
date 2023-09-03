import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Alert, Button } from "@mui/material";

function ChildEditCard() {
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isPageloading, setIsPageLoading] = useState(true);
  const [oneChildInfo, setOneChildInfo] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [canDeleteChild, setCanDeleteChild] = useState(false);
  const { childId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    checkNumberChilds();
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

  const checkNumberChilds = async () => {
    try {
      const RequestChilds = await service.get("child/all/");
      if (RequestChilds.data.length > 1) {
        setCanDeleteChild(true);
      }

      // console.log(RequestChilds.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChild = async (childId) => {
    event.preventDefault();
    try {
      const deleteChildRequest = await service.delete("/child/" + childId);
      console.log("good", deleteChildRequest, childId);

      navigate(-1);
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
    <div className="mainContainer">
      <h2>Edit Your Child</h2>
      <form>
        {/* <label htmlFor="name">Name</label> */}
        <TextField
          size="small"
          label="Childs Name"
          type="text"
          value={nameInput}
          onChange={handleInputChange}
        />

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/parent/child/edit/");
          }}
        >
          Cancel
        </Button>
      </form>
      {inputErrorMessage && (
        <Alert severity="error">
          {inputErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <br />
      {canDeleteChild && (
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            handleDeleteChild(oneChildInfo._id);
          }}
        >
          Delete
        </Button>
      )}
      <br />
      <br />
    </div>
  );
}

export default ChildEditCard;
