import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../timeføring_logo.svg";
import "./screens.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [noUser, setNoUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        setNoUser(false);
        setWrongPassword(false);
        setInvalidEmail(false);
        if (typeof data === "string" && data.toLowerCase().includes("user")) {
          setNoUser(true);
        }
        if (
          typeof data === "string" &&
          data.toLowerCase().includes("password")
        ) {
          setWrongPassword(true);
        }
        if (typeof data === "string" && data.toLowerCase().includes("email")) {
          setInvalidEmail(true);
        }
        if (data.user) {
          navigate("/home");
        }
      });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <Logo />
        <h2>Timeføring AS</h2>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Epost"
            value={loginData.email}
            name="email"
            id="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Passord"
            value={loginData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {noUser && (
            <p style={{ fontSize: "12px", color: "red" }}>
              Brukeren finnes ikke.
            </p>
          )}
          {wrongPassword && (
            <p style={{ fontSize: "12px", color: "red" }}>Passordet er feil.</p>
          )}
          {invalidEmail && (
            <p style={{ fontSize: "12px", color: "red" }}>
              Ikke en gyldig epost-adresse.
            </p>
          )}
          <button className="login-button" type="submit">
            Logg inn
          </button>
        </form>
        <div className="login-text">
          Har du ikke en bruker? Registrer deg
          <Link to="/register" style={{ color: "#f1f1f1" }}>
            her
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
