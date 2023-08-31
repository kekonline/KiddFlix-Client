import { Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import ParentHome from "./pages/ParentHome";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import ParentProfile from "./pages/ParentProfile";
import IsPrivate from "./components/IsPrivate";

//components

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/parent/home"
          element={
            <IsPrivate>
              <ParentHome />
            </IsPrivate>
          }
        />
        <Route
          path="/parent/profile"
          element={
            <IsPrivate>
              <ParentProfile />
            </IsPrivate>
          }
        />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
