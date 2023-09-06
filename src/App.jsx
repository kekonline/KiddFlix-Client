import "./App.css";

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
import ParentPasswordChange from "./pages/ParentPasswordChange";
import ChildEditCard from "./pages/ChildEditCard";
import ChildPlaylist from "./pages/ChildPlaylist";
import UsersProfile from "./pages/UsersProfile";
import ParentLogin from "./pages/ParentLogin";

//components
import IsKickBack from "./components/IsKickBack";
import IsChild from "./components/IsChild";
import IsParent from "./components/IsParent";
import ChildVideoPlay from "./components/ChildVideoPlayer";
import ParentTutorial from "./components/ParentTutorial";

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
            <IsParent>
              <ParentHome />
            </IsParent>
          }
        />
        <Route
          path="/parent/profile"
          element={
            <IsParent>
              <ParentProfile />
            </IsParent>
          }
        />

        <Route
          path="/parent/child/edit"
          element={
            <IsParent>
              <ChildEdit />
            </IsParent>
          }
        />
        <Route
          path="/parent/playlist/edit/:childName/:childId"
          element={
            <IsParent>
              <PlaylistEdit />
            </IsParent>
          }
        />

        <Route
          path="/parent/password-change"
          element={
            <IsParent>
              <ParentPasswordChange />
            </IsParent>
          }
        />

        <Route
          path="/parent/video/edit/:playlistName/:playlistId"
          element={
            <IsParent>
              <VideoEdit />
            </IsParent>
          }
        />

        <Route
          path="/parent/tutorial"
          element={
            <IsParent>
              <ParentTutorial />
            </IsParent>
          }
        />

        <Route
          path="/playlist"
          element={
            <IsChild>
              <ChildPlaylist />
            </IsChild>
          }
        />

        <Route
          path="/users-profile"
          element={
            <IsChild>
              <UsersProfile />
            </IsChild>
          }
        />
        <Route
          path="/parent-login"
          element={
            <IsChild>
              <ParentLogin />
            </IsChild>
          }
        />

        <Route
          path="/playlist/:playlistName/:playlistId"
          element={
            <IsChild>
              <ChildVideoInPlaylist />
            </IsChild>
          }
        />

        <Route
          path="/playlist/video/:link/:videoId"
          element={
            <IsChild>
              <ChildVideoPlay />
            </IsChild>
          }
        />

        <Route
          path="/video/:category"
          element={
            <IsChild>
              <ChildVideoCategory />
            </IsChild>
          }
        />

        <Route
          path="/parent/child/edit/:childId"
          element={
            <IsParent>
              <ChildEditCard />
            </IsParent>
          }
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
