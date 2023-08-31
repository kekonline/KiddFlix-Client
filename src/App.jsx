import { Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import ParentHome from "./pages/ParentHome";

//components

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/parent/home" element={<ParentHome />} />
      </Routes>
    </>
  );
}

export default App;
