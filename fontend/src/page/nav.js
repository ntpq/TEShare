import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
function Nav() {
  return (
    <header>
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="menu">
        <div>
          <Link to="/">HOME</Link>
        </div>
        <div>
          <Link to="/about">ABOUT</Link>
        </div>
        <div>
          <Link to="/login">LOGIN</Link>
        </div>
      </div>
    </header>
  );
}
export default Nav;
