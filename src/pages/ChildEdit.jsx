import { useEffect, useState } from "react";
// import { useEffect, useContext, useState } from "react";
// import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Alert, Button } from "@mui/material";
function ChildEdit() {
  const [isPageloading, setIsPageLoading] = useState(true);
  const [childsOfParent, setChildsOfParent] = useState(null);
  // const { updateParentChilds } = useContext(AuthContext);
  const [addChild, setAddChild] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestChildsOfParent = await service.get("child/all/");
      setChildsOfParent(requestChildsOfParent.data);
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChild = async () => {
    event.preventDefault();
    if (addChild === "") {
      setInputErrorMessage("Introduce a valid name");
      return;
    } else {
      setInputErrorMessage("");
    }

    try {
      const newChild = await service.post("/child/new/", {
        name: addChild,
      });
      setAddChild("");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteChild = async (childId) => {
  //   event.preventDefault();
  //   try {
  //     const deleteChildRequest = await service.delete("/child/" + childId);
  //     console.log("good", deleteChildRequest, childId);
  //     getData();
  //     // navigate("/parent/profile");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (isPageloading === true) {
    // setTimeout(() => {
    return <h3>... Loaging Nice Stuff...</h3>;
    // }, 1000);
  }

  return (
    <div>
      ChildEdit
      {childsOfParent &&
        childsOfParent.map((eachChild) => {
          return (
            <div key={eachChild._id}>
              <h3>{eachChild.name}</h3>
              <Link to={"/parent/child/edit/" + eachChild._id}>
                <Button variant="contained">Edit</Button>
              </Link>
              {/* path="/parent/child/edit/:childId" 
              
                 onClick={() => {
                  handleDeleteChild(eachChild._id);
                }}
              
              
              
              
              
              
              
              
              */}
              <br />
            </div>
          );
        })}
      <br />
      <form>
        {/* <label htmlFor="name">Name</label> */}
        <TextField
          label="New Childs Name"
          type="text"
          name="name"
          value={addChild}
          onChange={() => {
            setAddChild(event.target.value);
            // console.log(event.target.value);
          }}
        />

        <Button variant="contained" size="large" onClick={handleAddChild}>
          Add
        </Button>
        {inputErrorMessage && (
          <Alert severity="error">
            {inputErrorMessage}
            <br />
          </Alert>
        )}
      </form>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </div>
  );
}

export default ChildEdit;
