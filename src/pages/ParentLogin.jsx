import { useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";

//this is the page where the parent can re login into parent mode once in child mode
function ParentLogin() {
  const navigate = useNavigate();
  const [YOBInput, setYOBInput] = useState("");
  const [invalidLoginErrorMessage, setInvalidLoginErrorMessage] =
    useState(false);
  const { setParentIsActive, setChildIsActive } = useContext(AuthContext);
  const handleInput = (event) => {
    if (event.target.value.toString().length > 4) {
      return;
    }
    setYOBInput(event.target.value);
  };

  //we check if the year of date introduced by the parent is the one in his profile
  //if so we will set the child as inactive and the parent as active this will trigger the navbar to change too
  const handleLogIn = async () => {
    event.preventDefault();
    let validRequest = true;
    if (YOBInput === "") {
      //   console.log(YOBInput);
      setInvalidLoginErrorMessage("All fields are required");
      validRequest = false;
    } else if (YOBInput.length !== 4) {
      setInvalidLoginErrorMessage("Enter a valid year of birth");
      validRequest = false;
    } else {
      setInvalidLoginErrorMessage(false);
    }
    if (!validRequest) {
      setYOBInput("");
      return;
    }
    try {
      const responseValidYOB = await service.post("/parent/YOBCheck", {
        yearOfBirth: YOBInput,
      });
      // console.log(responseValidYOB.data);
      if (responseValidYOB.data) {
        setParentIsActive(true);
        setChildIsActive(false);
        navigate("/parent/home");
      } else {
        setYOBInput("");
        setInvalidLoginErrorMessage("invalid year of birth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //simple input page but has also the functionality of retrieved with the enter key
  return (
    <div className="mainContainer">
      <br />
      <h2>Enter year of birth</h2>
      <br />
      <form>
        <TextField
          label="Year of birth"
          size="small"
          type="password"
          name="yearOfBirth"
          onChange={handleInput}
          value={YOBInput}
          inputProps={{ autoFocus: true }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleLogIn();
            }
          }}
        ></TextField>
        <Button variant="contained" color="secondary" onClick={handleLogIn}>
          Login
        </Button>
      </form>
      <br />{" "}
      {invalidLoginErrorMessage && (
        <Alert variant="filled" severity="error">
          {invalidLoginErrorMessage}
          <br />
        </Alert>
      )}{" "}
      <br /> <br /> <br /> <br />
    </div>
  );
}

export default ParentLogin;
