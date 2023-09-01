import { Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import ParentHome from "./pages/ParentHome";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import ParentProfile from "./pages/ParentProfile";
import ChildEdit from "./pages/ChildEdit";
import PlaylistEdit from "./pages/PlaylistEdit";

//components
import IsPrivate from "./components/IsPrivate";
import IsParent from "./components/IsParent";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <IsParent>
              <Home />
            </IsParent>
          }
        />
        <Route
          path="/signin"
          element={
            <IsParent>
              <SignIn />
            </IsParent>
          }
        />
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

        <Route
          path="/parent/child/edit"
          element={
            <IsPrivate>
              <ChildEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/parent/playlist/edit"
          element={
            <IsPrivate>
              <PlaylistEdit />
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
