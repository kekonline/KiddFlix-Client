import { Link } from "react-router-dom";
import service from "../services/service.config";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import KiddFlixLogo from "../../src/assets/KiddFlix_Logo.png";

import { AuthContext } from "../context/auth.context";
import { TextField, Alert, Button } from "@mui/material";

function Home() {
  const [invalidLoginErrorMessage, setInvalidLoginErrorMessage] =
    useState(false);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { verifyToken, setParentIsActive, setChildIsActive } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    let validRequest = true;
    // event.preventDefault();
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
      setParentIsActive(true);
      setChildIsActive(false);

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
      <br />
      <h1>Welcome To </h1>
      <br />
      <br />
      <div className="homeContainer">
        <img src={KiddFlixLogo} className="kiddflixLogo" />
        <div>
          <div className="secondRow">
            <h2>
              Introducing KiddFlix: <br />
              Your Ultimate Solution <br />
              for Safe and Personalized <br />
              Kids' Entertainment
            </h2>

            <div className="login">
              <br />

              <form>
                {/* <label htmlFor="email">Email: </label> */}
                <TextField
                  variant="filled"
                  color="secondary"
                  size="small"
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleEmailInput}
                ></TextField>
                <br />
                <br />
                {/* <label htmlFor="password">Password: </label> */}
                <TextField
                  variant="filled"
                  color="secondary"
                  size="small"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handlePasswordInput}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleLogIn();
                    }
                  }}
                ></TextField>
                <br />
              </form>
              <br />
              <Button
                variant="contained"
                type="login"
                color="secondary"
                onClick={handleLogIn}
              >
                Login
              </Button>
              <br />
              {emailErrorMessage && (
                <Alert variant="filled" severity="error">
                  {emailErrorMessage}
                  <br />
                </Alert>
              )}
              <br />
              {invalidLoginErrorMessage && (
                <Alert variant="filled" severity="error">
                  {invalidLoginErrorMessage}
                </Alert>
              )}
              <br />
              {blancFieldsErrorMessage && (
                <Alert variant="filled" severity="error">
                  {blancFieldsErrorMessage}
                  <br />
                </Alert>
              )}
              <p>
                Not not registered yet?{" "}
                <Link to="/signin">
                  <Button variant="outlined" color="secondary">
                    Sign In
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="thirdRow childCard">
          <p>
            In today's digital age, children's access to online content has
            become an integral part of their daily lives. However, as parents,
            ensuring that our kids are exposed to age-appropriate and safe
            content can be a constant concern. Enter KiddFlix, the revolutionary
            app designed with parents in mind, offering a seamless and secure
            solution for curating personalized playlists of children's content
            without the need to navigate the vast landscape of YouTube.
          </p>

          <p>
            KiddFlix is the go-to platform for parents seeking a hassle-free way
            to provide their children with a curated and controlled viewing
            experience. With KiddFlix, you can finally bid farewell to the
            worries of accidental exposure to inappropriate material or endless
            YouTube scrolling. Instead, you can handpick and organize a
            selection of videos, channels, and shows tailored to your child's
            age, interests, and learning needs.
          </p>

          <p>
            At the core of KiddFlix's mission is safety. The app empowers
            parents to create a protective digital environment for their little
            ones. By pre-selecting content and building playlists within
            KiddFlix, you can rest easy, knowing your child's online journey is
            closely supervised and free from unwanted surprises.
          </p>

          <h2>Key Features of KiddFlix:</h2>
          <ol>
            <li>
              <strong>Personalized Playlists:</strong> KiddFlix lets you curate
              playlists with precision, ensuring your child only watches what
              you deem appropriate.
            </li>
            <li>
              <strong>Content Control:</strong> Say goodbye to the risks of
              unmonitored YouTube browsing. KiddFlix keeps your child's
              entertainment within your defined boundaries.
            </li>
            <li>
              <strong>Age-Appropriate Filters:</strong> Tailor the app to your
              child's age, so they engage with content that's both entertaining
              and educational.
            </li>
            <li>
              <strong>Parental Lock:</strong> Use a secure PIN to prevent
              unauthorized changes to the playlists, giving you full control
              over what your child watches.
            </li>
            <li>
              <strong>Peace of Mind:</strong> With KiddFlix, you can have peace
              of mind knowing that your child is enjoying a safe and enjoyable
              online experience.
            </li>
          </ol>

          <p>
            In a world where digital engagement is an inevitable part of growing
            up, KiddFlix offers a refreshing and reliable alternative.
            Experience the convenience of personalized playlists, the assurance
            of content control, and the joy of worry-free entertainment for your
            children. Say hello to KiddFlix, where your child's safety and
            enjoyment are our top priorities.
          </p>
        </div>
      </div>
      <br />
      <br /> <br /> <br />
    </div>
  );
}

export default Home;
