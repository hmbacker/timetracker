import React, { useState } from "react";
import validator from "validator";
import { ReactComponent as Logo } from "../images/timeføring_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "./screens.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [noMatch, setNoMatch] = useState(false);
  const [noValidEmail, setNoValidEmail] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email_input = document.getElementById("email");
    setNoValidEmail(false);
    setNoMatch(false);
    setPasswordTooShort(false);

    if (!validator.isEmail(email_input.value)) {
      setNoValidEmail(true);
      setNoMatch(false);
      return;
    }

    if (registerData.password === confirmedPassword) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            typeof data === "string" &&
            data.toLowerCase().includes("password")
          ) {
            setPasswordTooShort(true);
          }
          if (data.user) {
            navigate("/home");
          }
        });
    } else {
      setNoMatch(true);
    }
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <Logo />
        <h2>Registrer ny bruker</h2>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Epost"
            value={registerData.email}
            name="email"
            id="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Passord"
            value={registerData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Gjenta passord"
            value={confirmedPassword}
            name="confirmedPassword"
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          {noMatch && (
            <p style={{ fontSize: "12px", color: "red" }}>
              Passordene er ikke like.
            </p>
          )}
          {noValidEmail && (
            <p style={{ fontSize: "12px", color: "red" }}>
              Ikke en gyldig epost-adresse.
            </p>
          )}
          {passwordTooShort && (
            <p style={{ fontSize: "12px", color: "red" }}>
              Passordet er for kort.
            </p>
          )}
          <button className="login-button" type="submit">
            Registrer
          </button>
          <Link to="/" style={{ color: "#f1f1f1" }}>
            Gå tilbake
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
