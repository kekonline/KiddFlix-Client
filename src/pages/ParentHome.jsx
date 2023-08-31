import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function ParentHome() {
  const { childsOfParent } = useContext(AuthContext);

  // console.log(childsOfParent);

  return (
    <div>
      <p>Edit your profile</p>
      <Link to="/parent/profile">
        <button>Edit</button>
      </Link>
      <br />
      <p>Childs</p>

      {childsOfParent.map((eachChild) => {
        return (
          <div key={eachChild._id}>
            <h3>{eachChild.name}</h3>
            <button to={`parent/child/edit/${eachChild._id}`}>Edit</button>
          </div>
        );
      })}
      <br />
      <p>Add A Child</p>
      <button>Add</button>
    </div>
  );
}

export default ParentHome;
