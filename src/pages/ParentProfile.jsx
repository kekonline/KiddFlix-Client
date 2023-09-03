import service from "../services/service.config";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";

function ParentProfile() {
  const { parentId, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    name: "",
    password: "",
    yearOfBirth: 0,
  });

  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
    // console.log(formObjectClone);
    // console.log(name, formObjectClone[name]);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // console.log(parentId);
      const parentInfo = await service.get("/parent/");
      setFormObject({
        name: parentInfo.data.name,
        yearOfBirth: parentInfo.data.yearOfBirth,
      });

      // console.log(parentInfo.data.yearOfBirth);
      // console.log(formObject.yearOfBirth);
      // console.log(parentInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async (event) => {
    let validRequest = true;
    event.preventDefault();

    console.log(formObject.yearOfBirth.toString().length);

    if (
      typeof parseInt(formObject.yearOfBirth) !== "number" ||
      formObject.yearOfBirth.toString().length !== 4
    ) {
      setyearOfBirthErrorMessage("Introduce a valid year of birth ");
      validRequest = false;
    } else {
      setyearOfBirthErrorMessage(false);
    }

    if (!formObject.name || !formObject.password || !formObject.yearOfBirth) {
      setBlancFieldsErrorMessage("All fields are required");
      validRequest = false;
    } else {
      setBlancFieldsErrorMessage(false);
    }
    //  console.log(formObject);
    if (!validRequest) {
      return;
    }

    try {
      const updateParentRequest = await service.put("/parent/", formObject);
      //   console.log(signInRequest.data);

      //   console.log("update parent request", formObject);
      //   localStorage.setItem("authToken", signInRequest.data.authToken);

      //   await verifyToken();

      navigate("/parent/home");
    } catch (error) {
      //   console.log(error.response.data);
      console.log("error", error);
      //   navigate("/error");
    }
  };

  return (
    <div className="mainContainer ">
      <br />
      <div className="childCard">
        <h2>Your Profile</h2>
        <form>
          {/* <label htmlFor="name">Name: </label> */}
          <TextField
            label="Name"
            type="text"
            name="name"
            onChange={handleAnyInput}
            value={formObject.name}
          ></TextField>
          <br />
          {/* <label htmlFor="password">Password: </label> */}
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleAnyInput}
          ></TextField>
          <br />
          {/* <label htmlFor="yearOfBirth">Year Of Birth: </label> */}
          <TextField
            label="Year Of Birth"
            type="number"
            name="yearOfBirth"
            onChange={handleAnyInput}
            value={formObject.yearOfBirth}
          ></TextField>
          <br />
          <br />
          <div className="videoContainer">
            <Button variant="contained" onClick={handleEditProfile}>
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => (event.preventDefault(), navigate("/parent/home"))}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <br />
      {yearOfBirthErrorMessage && (
        <Alert severity="error">
          {yearOfBirthErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {blancFieldsErrorMessage && (
        <Alert severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
    </div>
  );
}

export default ParentProfile;
