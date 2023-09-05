import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Alert, Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

// add to component where you are creating an item

import { uploadImageService } from "../services/upload.services";

function ChildEditCard() {
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isPageloading, setIsPageLoading] = useState(true);
  const [oneChildInfo, setOneChildInfo] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [canDeleteChild, setCanDeleteChild] = useState(false);
  const { childId } = useParams();
  const navigate = useNavigate();

  //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST
  // below state will hold the image URL from cloudinary. This will come from the backend.
  // const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  useEffect(() => {
    getData();
    checkNumberChilds();
  }, [isUploading]);

  const getData = async () => {
    try {
      const requestOneChild = await service.get("child/" + childId);
      setOneChildInfo(requestOneChild.data);
      setNameInput(requestOneChild.data.name);
      setIsPageLoading(false);
      // console.log(requestOneChild.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkNumberChilds = async () => {
    try {
      const RequestChilds = await service.get("child/all/");
      if (RequestChilds.data.length > 1) {
        setCanDeleteChild(true);
      }

      // console.log(RequestChilds.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChild = async (childId) => {
    event.preventDefault();
    try {
      const deleteChildRequest = await service.delete("/child/" + childId);
      // console.log("good", deleteChildRequest, childId);

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleSave = async () => {
    event.preventDefault();
    if (nameInput === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newChild = await service.put("/child/" + oneChildInfo._id, {
        name: nameInput,
      });
      navigate("/parent/child/edit/");
    } catch (error) {
      console.log(error);
    }
  };

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

      // setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      // await service.put("/parent/", { picture: response.data.imageUrl });
      await service.put("/child/" + oneChildInfo._id, {
        picture: response.data.imageUrl,
      });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  //! CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST CLOUDINARY TEST

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 500);
  }

  return (
    <div className="mainContainer">
      <h2>Edit Your Child</h2>
      <div className="childCard">
        {/* {console.log(oneChildInfo.name)} */}
        <img className="profilePicture" src={oneChildInfo.picture} alt="img" />
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
          {/* below disabled prevents the user from attempting another upload while one is already happening */}
        </div>

        {/* to render a loading message or spinner while uploading the picture */}
        {isUploading ? <h3>... uploading image</h3> : null}

        <br />
        {/* below line will render a preview of the image from cloudinary */}

        <form>
          {/* <label htmlFor="name">Name</label> */}
          <TextField
            variant="filled"
            color="secondary"
            size="small"
            label="Childs Name"
            type="text"
            value={nameInput}
            onChange={handleInputChange}
          />

          <Button variant="contained" size="large" onClick={handleSave}>
            Save
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              navigate("/parent/child/edit/");
            }}
          >
            Cancel
          </Button>
        </form>
        <br />
        {inputErrorMessage && (
          <Alert variant="filled" severity="error">
            {inputErrorMessage}
            <br />
          </Alert>
        )}
      </div>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <br />
      {canDeleteChild && (
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            handleDeleteChild(oneChildInfo._id);
          }}
        >
          Delete
        </Button>
      )}
      <br />
      <br />
    </div>
  );
}

export default ChildEditCard;
