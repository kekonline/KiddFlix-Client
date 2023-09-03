import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Alert, Button, TextField } from "@mui/material";

function SignIn() {
  const navigate = useNavigate();

  const { verifyToken, setParentIsActive } = useContext(AuthContext);

  const [invalidEmailErrorMessage, setInvalidEmailErrorMessage] =
    useState(false);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    password: "",
    yearOfBirth: 0,
    childName: "",
  });

  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
    // console.log(formObjectClone);
    // console.log(name, formObjectClone[name]);
  };

  const handleSignIn = async (event) => {
    let validRequest = true;
    event.preventDefault();
    if (
      (formObject.name === "email" && !formObject.email.includes("@")) ||
      !formObject.email.includes(".")
    ) {
      setEmailErrorMessage("Introduce a valid email ");
      validRequest = false;
    } else {
      setEmailErrorMessage(false);
    }
    if (
      typeof formObject.yearOfBirth === "number" ||
      formObject.yearOfBirth.length !== 4
    ) {
      setyearOfBirthErrorMessage("Introduce a valid year of birth ");
      validRequest = false;
    } else {
      setyearOfBirthErrorMessage(false);
    }

    if (
      !formObject.name ||
      !formObject.email ||
      !formObject.password ||
      !formObject.yearOfBirth ||
      !formObject.childName
    ) {
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
      const signInRequest = await service.post("/auth/signin", formObject);
      //   console.log(signInRequest.data);
      setInvalidEmailErrorMessage("");

      localStorage.setItem("authToken", signInRequest.data.authToken);
      setParentIsActive(true);
      setChildIsActive(false);
      await verifyToken();

      navigate("/parent/home");
    } catch (error) {
      //   console.log(error.response.data);
      //   console.log(error.response.data.emailValid);
      //   navigate("/error");
      if (
        !error.response.data.emailValid &&
        error.response.data.emailValid !== undefined
      ) {
        setInvalidEmailErrorMessage("Invalid email already used");
      }
    }
  };

  return (
    <div>
      <h1>Welcome to KiddFlix</h1>
      <form>
        {/* <label htmlFor="name">Name: </label> */}
        <TextField
          label="Name"
          type="text"
          name="name"
          onChange={handleAnyInput}
        ></TextField>
        <br />
        {/* <label htmlFor="email">Email: </label> */}
        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={handleAnyInput}
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
        ></TextField>
        <br />
        {/* <label htmlFor="childName">Child Name: </label> */}
        <TextField
          label="Child Name"
          type="text"
          name="childName"
          onChange={handleAnyInput}
        ></TextField>
        <br />
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      </form>
      {emailErrorMessage && (
        <Alert severity="error">
          {emailErrorMessage}
          <br />
        </Alert>
      )}
      {yearOfBirthErrorMessage && (
        <Alert severity="error">
          {yearOfBirthErrorMessage}
          <br />
        </Alert>
      )}
      {blancFieldsErrorMessage && (
        <Alert severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
      {invalidEmailErrorMessage && (
        <Alert severity="error">
          {invalidEmailErrorMessage}
          <br />
        </Alert>
      )}
    </div>
  );
}

export default SignIn;
