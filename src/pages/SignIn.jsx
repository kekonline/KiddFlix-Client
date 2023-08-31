import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

function SignIn() {
  const navigate = useNavigate();

  const { verifyToken } = useContext(AuthContext);

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
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleAnyInput}></input>
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" onChange={handleAnyInput}></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={handleAnyInput}
        ></input>
        <br />
        <label htmlFor="yearOfBirth">Year Of Birth: </label>
        <input
          type="number"
          name="yearOfBirth"
          onChange={handleAnyInput}
        ></input>
        <br />
        <label htmlFor="childName">Child Name: </label>
        <input type="text" name="childName" onChange={handleAnyInput}></input>
        <br />
        <button onClick={handleSignIn}>Sign In</button>
      </form>
      {emailErrorMessage && (
        <p>
          {emailErrorMessage}
          <br />
        </p>
      )}
      {yearOfBirthErrorMessage && (
        <p>
          {yearOfBirthErrorMessage}
          <br />
        </p>
      )}
      {blancFieldsErrorMessage && (
        <p>
          {blancFieldsErrorMessage}
          <br />
        </p>
      )}
      {invalidEmailErrorMessage && (
        <p>
          {invalidEmailErrorMessage}
          <br />
        </p>
      )}
    </div>
  );
}

export default SignIn;
