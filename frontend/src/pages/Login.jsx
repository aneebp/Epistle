import React, { useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("form is working");
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("api/user/token/", { email, password });
      console.log("entering the try block");
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized: Incorrect username or password.");
      } else {
        setError("An error occurred. Please try again.", error);
        console.log("An error occurred. Please try again.", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {error && <p className="error-message">{error}</p>}
        <p className="title">Login </p>

        <label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required=""
            placeholder=""
            type="email"
            className="input"
          />
          <span>Email</span>
        </label>

        <label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required=""
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>
        <div className="wrapper">
          <button type="submit" className="submit">
            Login
          </button>
        </div>
        <p className="signin">
          Don't have an acount ? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
