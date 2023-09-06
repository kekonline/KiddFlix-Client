import service from "../services/service.config";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImageService } from "../services/upload.services";

function ParentProfile() {
  const { parentId, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPageloading, setIsPageLoading] = useState(true);
  const [blancFieldsErrorMessage, setBlancFieldsErrorMessage] = useState(false);
  const [yearOfBirthErrorMessage, setyearOfBirthErrorMessage] = useState(false);
  const [formObject, setFormObject] = useState({
    name: "",
    yearOfBirth: 0,
    picture: "",
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleAnyInput = (event) => {
    const { name, value } = event.target;
    if (name === "yearOfBirth" && value.toString().length > 4) {
      return;
    }
    let formObjectClone = { ...formObject };
    formObjectClone[name] = value;
    setFormObject(formObjectClone);
  };

  useEffect(() => {
    getData();
  }, [isUploading]);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      await service.put("/parent/", { picture: response.data.imageUrl });
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

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
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
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

    if (!formObject.name || !formObject.yearOfBirth) {
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
      navigate("/parent/home");
    } catch (error) {
      //   console.log(error.response.data);
      console.log("error", error);
      //   navigate("/error");
    }
  };

  if (isPageloading === true) {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
  }

  return (
    <div className="mainContainer ">
      <br />
      <div className="childCard">
        <h2>Your Profile</h2>
        <img className="profilePicture" src={formObject.picture} alt="img" />
        <div>
          <br />
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            upload
            <input
              hidden
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Button>
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        <br />
        <form>
          <TextField
            label="Name"
            type="text"
            name="name"
            onChange={handleAnyInput}
            value={formObject.name}
          ></TextField>
          <br /> <br />
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
        <br />
        <Link to="/parent/password-change">
          <Button variant="outlined">Want To Change Your Password?</Button>{" "}
        </Link>
      </div>
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
      <Link to="/parent/tutorial">
        <Button variant="outlined" color="success">
          Watch The Tutorial again?
        </Button>{" "}
      </Link>
      <br />
      <br /> <br />
      <br />
    </div>
  );
}

export default ParentProfile;
