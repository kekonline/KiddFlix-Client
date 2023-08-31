import { Link } from "react-router-dom";
import service from "../services/service.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Home() {
  const [invalidLoginErrorMessage, setInvalidLoginErrorMessage] =
    useState(false);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { verifyToken } = useContext(AuthContext);

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

      await verifyToken();

      navigate("/parent/home");
      setInvalidLoginErrorMessage("");
    } catch (error) {
      console.log(error.response.data);
      if (
        !error.response.data.validLogin &&
        error.response.data.validLogin !== undefined
      ) {
        setInvalidLoginErrorMessage("Invalid email or password");
      }
    }
  };

  return (
    <div>
      <h1>Welcome to KiddFlix</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" onChange={handleEmailInput}></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordInput}
        ></input>
        <br />
      </form>
      <button type="login" onClick={handleLogIn}>
        Login
      </button>
      <br />
      {emailErrorMessage && (
        <p>
          {emailErrorMessage}
          <br />
        </p>
      )}
      {invalidLoginErrorMessage && (
        <p>
          {invalidLoginErrorMessage}
          <br />
        </p>
      )}
      {blancFieldsErrorMessage && (
        <p>
          {blancFieldsErrorMessage}
          <br />
        </p>
      )}
      <p>
        Not not registered yet? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default Home;
