import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ToastContainer></ToastContainer>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>
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
          <Route path="/profile" element={<Profile></Profile>}></Route>
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
