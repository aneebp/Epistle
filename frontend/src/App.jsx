import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Allblogposts from "./pages/Allblogposts";

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
