import React from "react";
import { ReactComponent as Logo } from "../../timeføring_logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">Timeføring AS</div>
        <Logo />
      </div>
    </div>
  );
};

export default Navbar;
