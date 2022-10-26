import "../styles/navbar.scss";

import logo from "../assets/logo.jpeg";

export default function Navbar() {
  return (
    <div className="navbar">
      <img alt="" src={logo}></img>
      <h2>AIM EdgeApps</h2>
    </div>
  );
}
