import service from "../services/service.config";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";

//! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

// add to component where you are creating an item

import { uploadImageService } from "../services/upload.services";

function ParentProfile() {
  const { parentId, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    name: "",
    password: "",
    yearOfBirth: 0,
    picture: "",
  });

  //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
  // below state will hold the image URL from cloudinary. This will come from the backend.
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

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
  }, [isUploading]);

  //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      await service.put("/parent/", { picture: response.data.imageUrl });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

  const getData = async () => {
    try {
      // console.log(parentId);
      const parentInfo = await service.get("/parent/");
      setFormObject({
        name: parentInfo.data.name,
        yearOfBirth: parentInfo.data.yearOfBirth,
        picture: parentInfo.data.picture,
      });
      // console.log(formObject.picture);
      // console.log(parentInfo.data.yearOfBirth);
      // console.log(formObject.yearOfBirth);
      // console.log(parentInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async (event) => {
    let validRequest = true;
    event.preventDefault();

    console.log(formObject.yearOfBirth.toString().length);

    if (
      typeof parseInt(formObject.yearOfBirth) !== "number" ||
      formObject.yearOfBirth.toString().length !== 4
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
      const updateParentRequest = await service.put("/parent/", formObject);
      //   console.log(signInRequest.data);

      //   console.log("update parent request", formObject);
      //   localStorage.setItem("authToken", signInRequest.data.authToken);

      //   await verifyToken();

      //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
      //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
      //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

      // add to component where you are creating an item

      // import { uploadImageService } from "../services/upload.services";

      // ...

      //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
      //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

      navigate("/parent/home");
    } catch (error) {
      //   console.log(error.response.data);
      console.log("error", error);
      //   navigate("/error");
    }
  };

  return (
    <div className="mainContainer ">
      <br />
      <div className="childCard">
        <h2>Your Profile</h2>
        <img className="profilePicture" src={formObject.picture} alt="img" />
        <div>
          <br />
          <Button variant="contained" component="label">
            upload
            <input
              hidden
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Button>
          {/* below disabled prevents the user from attempting another upload while one is already happening */}
        </div>

        {/* to render a loading message or spinner while uploading the picture */}
        {isUploading ? <h3>... uploading image</h3> : null}

        <br />
        {/* below line will render a preview of the image from cloudinary */}
        <form>
          {/* <label htmlFor="name">Name: </label> */}
          <TextField
            label="Name"
            type="text"
            name="name"
            onChange={handleAnyInput}
            value={formObject.name}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="password">Password: </label> */}
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleAnyInput}
          ></TextField>
          <br /> <br />
          {/* <label htmlFor="yearOfBirth">Year Of Birth: </label> */}
          <TextField
            label="Year Of Birth"
            type="number"
            name="yearOfBirth"
            onChange={handleAnyInput}
            value={formObject.yearOfBirth}
          ></TextField>
          <br />
          <br />
          <div className="videoContainer">
            <Button variant="contained" onClick={handleEditProfile}>
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => (event.preventDefault(), navigate("/parent/home"))}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <br />
      {yearOfBirthErrorMessage && (
        <Alert severity="error">
          {yearOfBirthErrorMessage}
          <br />
        </Alert>
      )}
      <br />
      {blancFieldsErrorMessage && (
        <Alert severity="error">
          {blancFieldsErrorMessage}
          <br />
        </Alert>
      )}
    </div>
  );
}

export default ParentProfile;
