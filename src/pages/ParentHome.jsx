import { Link } from "react-router-dom";

function ParentHome() {
  return (
    <div>
      <p>Edit your profile</p>
      <Link to="/parent/profile">
        <button>Edit</button>
      </Link>
      <br />
      <p>Edit Child</p>
      <button>Edit</button>
      <br />
      <p>Add A Child</p>
      <button>Add</button>
    </div>
  );
}

export default ParentHome;
