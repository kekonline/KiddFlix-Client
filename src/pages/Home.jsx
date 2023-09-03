import { Link } from "react-router-dom";
import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";

import { AuthContext } from "../context/auth.context";
import { TextField, Alert, Button } from "@mui/material";

function Home() {
  const [invalidLoginErrorMessage, setInvalidLoginErrorMessage] =
    useState(false);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { verifyToken, setParentIsActive } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    let validRequest = true;
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setEmailErrorMessage("Introduce a valid email ");
      validRequest = false;
    } else {
      setEmailErrorMessage(false);
    }

    if (!email || !password) {
      setBlancFieldsErrorMessage("All fields are required");
      validRequest = false;
    } else {
      setBlancFieldsErrorMessage(false);
    }

    if (!validRequest) {
      return;
    }

    try {
      const logInRequest = await service.post("/auth/login", {
        email,
        password,
      });
      console.log(logInRequest);

      localStorage.setItem("authToken", logInRequest.data.authToken);
      setParentIsActive(true);
      setChildIsActive(false);
      await verifyToken();

      navigate("/parent/home");
      setInvalidLoginErrorMessage("");
    } catch (error) {
      console.log(error);
      if (error.response !== undefined) {
        setInvalidLoginErrorMessage("Invalid email or password");
      }
    }
  };

  return (
    <div>
      <h1>Welcome to KiddFlix</h1>
      <form>
        {/* <label htmlFor="email">Email: </label> */}
        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={handleEmailInput}
        ></TextField>
        <br />
        {/* <label htmlFor="password">Password: </label> */}
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={handlePasswordInput}
        ></TextField>
        <br />
      </form>
      <Button variant="contained" type="login" onClick={handleLogIn}>
        Login
      </Button>
      <br />
      {emailErrorMessage && (
        <Alert severity="error">
          {emailErrorMessage}
          <br />
        </Alert>
      )}
      {invalidLoginErrorMessage && (
        <Alert severity="error">
          {invalidLoginErrorMessage}
          <br />
        </Alert>
      )}
      {blancFieldsErrorMessage && (
        <Alert severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
      <p>
        Not not registered yet?{" "}
        <Link to="/signin">
          <Button variant="outlined">Sign In</Button>
        </Link>
      </p>
    </div>
  );
}

export default Home;
