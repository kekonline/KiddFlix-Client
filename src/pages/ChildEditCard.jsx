import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Alert, Button } from "@mui/material";
import LoadingPic from "../../src/assets/Loading.gif";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImageService } from "../services/upload.services";

//here is where we can edit our child's info
function ChildEditCard() {
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isPageloading, setIsPageLoading] = useState(true);
  const [oneChildInfo, setOneChildInfo] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [canDeleteChild, setCanDeleteChild] = useState(false);
  const { childId } = useParams();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  //here we get the necessary data we also check the number of child the parent has so he cannot delete the child if he only has one and every time a user updates the photo the page will be reloaded
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
      console.log(requestOneChild.data.picture);
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

  //here we handle the delete child
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

  //here we handle save the new information
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

  //here we handle the picture upload
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      await service.put("/child/" + oneChildInfo._id, {
        picture: response.data.imageUrl,
      });
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isPageloading === true) {
    // setTimeout(() => {
    return (
      <div className="loadingContainer">
        <img className="loadingImage" src={LoadingPic} />;
      </div>
    );
    // }, 500);
  }

  // console.log(oneChildInfo.picture);

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
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        <br />
        <form>
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
      {/* we will only visualize the delete button if the parent has more than one child */}
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
      <br /> <br /> <br />
    </div>
  );
}

export default ChildEditCard;
