import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Alert, Button, TextField } from "@mui/material";

function SignIn() {
  const navigate = useNavigate();

  const { verifyToken, setParentIsActive, setChildIsActive } =
    useContext(AuthContext);

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

      await verifyToken();
      setParentIsActive(true);
      setChildIsActive(false);

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
    <div className="mainContainer ">
      <br />
      <h1>Sign In To KiddFlix</h1>
      <br />
      <div className="childCard">
        <form>
          {/* <label htmlFor="name">Name: </label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Name"
            type="text"
            name="name"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="email">Email: </label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Email"
            type="email"
            name="email"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="password">Password: </label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Password"
            type="password"
            name="password"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="yearOfBirth">Year Of Birth: </label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Year Of Birth"
            type="number"
            name="yearOfBirth"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="childName">Child Name: </label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Child Name"
            type="text"
            name="childName"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          <div className="videoContainer">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
          <br />
        </form>
      </div>{" "}
      <br />
      {emailErrorMessage && (
        <Alert variant="filled" severity="error">
          {emailErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {yearOfBirthErrorMessage && (
        <Alert variant="filled" severity="error">
          {yearOfBirthErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {blancFieldsErrorMessage && (
        <Alert variant="filled" severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {invalidEmailErrorMessage && (
        <Alert variant="filled" severity="error">
          {invalidEmailErrorMessage}
          <br />
        </Alert>
      )}
    </div>
  );
}

export default SignIn;
