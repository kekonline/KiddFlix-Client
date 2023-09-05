import service from "../services/service.config";
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function ParentPasswordChange() {
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [passwordWrongErrorMessage, setPasswordWrongErrorMessage] =
    useState(false);
  const [pass1And2ErrorMessage, setPass1And2ErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    password: "",
    newPassword: "",
    newPassword2: "",
  });

  const navigate = useNavigate();
  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
    // console.log(formObject);
  };

  const handleEditPassword = async (event) => {
    event.preventDefault();
    let validRequest = true;
    if (
      !formObject.password ||
      !formObject.newPassword ||
      !formObject.newPassword2
    ) {
      setBlancFieldsErrorMessage("All fields are required");
      validRequest = false;
    } else {
      setBlancFieldsErrorMessage(false);
    }

    if (formObject.newPassword2Input !== formObject.newPasswordInput) {
      setPasswordErrorMessage("New Passwords do not match");
      validRequest = false;
    }

    if (!validRequest) {
      return;
    }

    try {
      const newPasswordChangeRequest = await service.post("/auth/newPassword", {
        password: formObject.password,
        newPassword: formObject.newPassword,
      });
      // console.log(newPasswordChangeRequest.data);

      if (newPasswordChangeRequest.data.passwordUpdated) {
        navigate("/parent/profile");
      } else {
        setPasswordWrongErrorMessage("Your password is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer ">
      <br />
      <div className="childCard">
        <h2>Password Change</h2>
        <br />
        <form>
          <TextField
            label="Your Password"
            type="password"
            name="password"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          <TextField
            label="New Password 2nd Time"
            type="password"
            name="newPassword2"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          <div className="videoContainer">
            <Button variant="contained" onClick={handleEditPassword}>
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => (
                event.preventDefault(), navigate("/parent/profile")
              )}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <br />
      {blancFieldsErrorMessage && (
        <Alert variant="filled" severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {passwordWrongErrorMessage && (
        <Alert variant="filled" severity="error">
          {passwordWrongErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {pass1And2ErrorMessage && (
        <Alert variant="filled" severity="error">
          {pass1And2ErrorMessage}
          <br />
        </Alert>
      )}
    </div>
  );
}

export default ParentPasswordChange;
