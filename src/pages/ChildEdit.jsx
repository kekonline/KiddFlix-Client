import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Alert, Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";

//here we visualize a list of child the parent has to be able to go to edit
function ChildEdit() {
  const [isPageloading, setIsPageLoading] = useState(true);
  const [childsOfParent, setChildsOfParent] = useState(null);
  const [addChild, setAddChild] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const navigate = useNavigate();

  //we get needed data start
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

  //on this page we can also add child's and here's where we manage them
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

  if (isPageloading === true) {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
  }

  //here we list on the user side the child the parent has and add buttons and error messages
  return (
    <div className="mainContainer">
      <h1>Your Childs To Manage</h1>
      {childsOfParent &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <div className="childCard">
                <h2>{eachChild.name}</h2>
                <img
                  className="profilePicture"
                  src={eachChild.picture}
                  alt="img"
                />
                <br />
                <Link to={"/parent/child/edit/" + eachChild._id}>
                  <Button variant="contained">Edit</Button>
                </Link>
                <br />
              </div>
              <br />
            </div>
          );
        })}
      <br />
      <form>
        <TextField
          size="small"
          label="New Childs Name"
          type="text"
          name="name"
          value={addChild}
          onChange={() => {
            setAddChild(event.target.value);
          }}
        />
        <Button variant="contained" color="success" onClick={handleAddChild}>
          Add
        </Button>
        <br />
        {inputErrorMessage && (
          <Alert variant="filled" severity="error">
            {inputErrorMessage}
            <br />
          </Alert>
        )}
      </form>
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
      <br /> <br /> <br />
    </div>
  );
}

export default ChildEdit;
