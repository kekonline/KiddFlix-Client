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
import VideoEdit from "./pages/VideoEdit";
import ChildVideoInPlaylist from "./pages/ChildVideoInPlaylist";
import ChildVideoCategory from "./pages/ChildVideoCategory";

//components
import IsPrivate from "./components/IsPrivate";
import IsParent from "./components/IsParent";
import ChildPlaylist from "./pages/ChildPlaylist";
import UsersProfile from "./pages/UsersProfile";
import ParentLogin from "./pages/ParentLogin";
import ChildVideoPlay from "./components/ChildVideoPlayer";

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
          path="/parent/playlist/edit/:childName/:childId"
          element={
            <IsPrivate>
              <PlaylistEdit />
            </IsPrivate>
          }
        />

        <Route
          path="/parent/video/edit/:playlistName/:playlistId"
          element={
            <IsPrivate>
              <VideoEdit />
            </IsPrivate>
          }
        />

        <Route
          path="/playlist"
          element={
            <IsPrivate>
              <ChildPlaylist />
            </IsPrivate>
          }
        />

        <Route
          path="/users-profile"
          element={
            <IsPrivate>
              <UsersProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/parent-login"
          element={
            <IsPrivate>
              <ParentLogin />
            </IsPrivate>
          }
        />

        <Route
          path="/playlist/:playlistName/:playlistId"
          element={
            <IsPrivate>
              <ChildVideoInPlaylist />
            </IsPrivate>
          }
        />

        <Route
          path="/playlist/video/:link"
          element={
            <IsPrivate>
              <ChildVideoPlay />
            </IsPrivate>
          }
        />

        <Route
          path="/video/:category"
          element={
            <IsPrivate>
              <ChildVideoCategory />
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
