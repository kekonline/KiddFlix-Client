import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Alert, Button, TextField } from "@mui/material";

//this is the signing page
function SignIn() {
  const navigate = useNavigate();
  const { verifyToken, setParentIsActive, setChildIsActive } =
    useContext(AuthContext);
  const [invalidEmailErrorMessage, setInvalidEmailErrorMessage] =
    useState(false);
  const [strongPasswordErrorMessage, setStrongPasswordErrorMessage] =
    useState(false);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [password2Input, setPassword2Input] = useState("");
  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    password: "",
    yearOfBirth: "",
    childName: "",
  });

  //here we save all the inputs by the user in our object
  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    if (name === "yearOfBirth" && value.toString().length > 4) {
      return;
    }
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
    // console.log(formObjectClone);
    // console.log(name, formObjectClone[name]);
  };

  //the verification of the two passwords are the same
  const handlePassword2Input = (event) => {
    const { name, value } = event.target;
    setPassword2Input(value);
    // console.log(password2Input);
  };

  //here we checked that the introduced values by the user are correct Plus we try to make the user introduce a strong password once all the data is validated we will proceed to store the receipt tokens by the back end and activate the parent mode put him in to the parents page
  const handleSignIn = async (event) => {
    let validRequest = true;
    // event.preventDefault();
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
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm;
    if (regexPassword.test(formObject.password) === false) {
      validRequest = false;
      setStrongPasswordErrorMessage(
        "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter and one number"
      );
    } else {
      setStrongPasswordErrorMessage(false);
    }
    if (password2Input !== formObject.password) {
      setPasswordErrorMessage("Passwords do not match");
      validRequest = false;
    } else {
      setPasswordErrorMessage(false);
    }

    if (
      !formObject.name ||
      !formObject.email ||
      !formObject.password ||
      !formObject.yearOfBirth ||
      !formObject.childName ||
      !password2Input
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
      navigate("/parent/tutorial");
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

  //here is the visualization of the signing page
  return (
    <div className="mainContainer ">
      <br />
      <h1>Sign In To KiddFlix</h1>
      <br />
      <div className="childCard">
        <form>
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
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Password Second Time"
            type="password"
            name="password2"
            onChange={handlePassword2Input}
          ></TextField>
          <br /> <br />
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Year Of Birth"
            type="number"
            name="yearOfBirth"
            onChange={handleAnyInput}
            value={formObject.yearOfBirth}
          ></TextField>
          <br /> <br />
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Child Name"
            type="text"
            name="childName"
            onChange={handleAnyInput}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSignIn();
              }
            }}
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
        </form>
      </div>{" "}
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
      <br />
      {passwordErrorMessage && (
        <Alert variant="filled" severity="error">
          {passwordErrorMessage}
          <br />
        </Alert>
      )}{" "}
      <br />
      {strongPasswordErrorMessage && (
        <Alert variant="filled" severity="error">
          {strongPasswordErrorMessage}
          <br />
        </Alert>
      )}
      <br /> <br /> <br />
      <br />
    </div>
  );
}

export default SignIn;
