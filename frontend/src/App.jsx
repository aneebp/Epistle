import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Allblogposts from "./pages/Allblogposts";
import ScrollToTop from "./components/ScrollToTop";
import Blogdetails from "./pages/Blogdetails";
import Startwriting from "./pages/Startwriting";
import Profile from "./pages/Profile";
import TopicBlog from "./pages/TopicBlog";
import ProfileEditing from "./pages/ProfileEditing";

function Logout() {
  localStorage.clear();
  return <Navigate to="/"></Navigate>;
}
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/blogposts"
            element={<Allblogposts></Allblogposts>}
          ></Route>
          <Route
            path="/blogdetail/:slug"
            element={<Blogdetails></Blogdetails>}
          ></Route>
          <Route
            path="/startwriting"
            element={<Startwriting></Startwriting>}
          ></Route>
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile></Profile>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <ProfileEditing></ProfileEditing>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/topic/post/:slug"
            element={<TopicBlog></TopicBlog>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
