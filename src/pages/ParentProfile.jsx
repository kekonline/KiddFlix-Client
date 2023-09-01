import service from "../services/service.config";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
function ParentProfile() {
  const { parentId, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    name: "",
    password: "",
    yearOfBirth: 0,
  });

  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
    // console.log(formObjectClone);
    // console.log(name, formObjectClone[name]);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // console.log(parentId);
      const parentInfo = await service.get("/parent/" + parentId);
      setFormObject({
        name: parentInfo.data.name,
        yearOfBirth: parentInfo.data.yearOfBirth,
      });

      // console.log(parentInfo.data.yearOfBirth);
      // console.log(parentInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async (event) => {
    let validRequest = true;
    event.preventDefault();

    if (
      typeof formObject.yearOfBirth === "number" ||
      formObject.yearOfBirth.length !== 4
    ) {
      setyearOfBirthErrorMessage("Introduce a valid year of birth ");
      validRequest = false;
    } else {
      setyearOfBirthErrorMessage(false);
    }

    if (!formObject.name || !formObject.password || !formObject.yearOfBirth) {
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
      const updateParentRequest = await service.put(
        "/parent/" + parentId,
        formObject
      );
      //   console.log(signInRequest.data);

      //   console.log("update parent request", formObject);
      //   localStorage.setItem("authToken", signInRequest.data.authToken);

      //   await verifyToken();

      navigate("/parent/home");
    } catch (error) {
      //   console.log(error.response.data);
      console.log("error", error);
      //   navigate("/error");
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          onChange={handleAnyInput}
          value={formObject.name}
        ></input>
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
          value={formObject.yearOfBirth}
        ></input>
        <br />
        <button onClick={handleEditProfile}>Save</button>
        <button
          onClick={() => (event.preventDefault(), navigate("/parent/home"))}
        >
          Cancel
        </button>
      </form>
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
    </div>
  );
}

export default ParentProfile;
