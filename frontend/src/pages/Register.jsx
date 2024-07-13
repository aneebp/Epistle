import React, { useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [full_name, setfull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("api/user/register/", {
        full_name,
        email,
        password,
        password2,
      });
      navigate("/");
    } catch (error) {
      console.log(error.response.data); // Log the error details from the server
      setError(
        "Error occurred when registering user: " +
          JSON.stringify(error.response.data)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <p className="title">Register </p>
        {error && <p className="error-message">{error}</p>}

        <label>
          <input
            value={full_name}
            onChange={(e) => setfull_name(e.target.value)}
            required=""
            placeholder=""
            type="text"
            className="input"
          />
          <span>Firstfull_name</span>
        </label>

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
        <label>
          <input
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
            required=""
            placeholder=""
            type="password"
            className="input"
          />
          <span>Confirm password</span>
        </label>
        <div className="wrapper">
          <button type="submit" disabled={loading} className="submit">
            {loading ? "loading..." : "Register"}
          </button>
        </div>
        <p className="signin">
          Already have an acount ? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
