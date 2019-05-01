import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="App-header">
      <Link className="App-title" to="/">CodeChat</Link>
    </header>
  );
};

export default Header;