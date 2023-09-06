import { useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";
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
