import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allblogposts from "./pages/Allblogposts";
import ScrollToTop from "./components/ScrollToTop";
import Blogdetails from "./pages/Blogdetails";
import Startwriting from "./pages/Startwriting";
import Profile from "./pages/Profile";
import TopicBlog from "./pages/TopicBlog";
import ProfileEditing from "./pages/ProfileEditing";
import Blogupdate from "./pages/Blogupdate";

function Logout() {
  localStorage.clear();
  return <Navigate to="/"></Navigate>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer /> {/* Place the ToastContainer here */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/blogposts" element={<Allblogposts />} />
          <Route path="/blogdetail/:slug" element={<Blogdetails />} />
          <Route path="/blogdetail/update/:slug" element={<Blogupdate />} />
          <Route path="/startwriting" element={<Startwriting />} />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <ProfileEditing />
              </ProtectedRoute>
            }
          />
          <Route path="/topic/post/:slug" element={<TopicBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
