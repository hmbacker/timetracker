import React from "react";
import { ReactComponent as Logo } from "../../images/timeføring_logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">Timeføring AS</div>
        <div className="navbar-logo">
          <Logo style={{ height: "8vh" }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
