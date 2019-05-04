import React from "react";
import { Link } from "react-router-dom";
import GithubCorner from 'react-github-corner';
import "./header.css";

const Header = () => {
  return (
    <header className="App-header">
      <Link className="App-title" to="/">CodeChat</Link>
      <GithubCorner
  href='https://github.com/mawais54013/Chat-It'
  bannerColor="#151513"
  octoColor="#fff"
  size={80}
  direction="right" 
  target="_blank"
/>
    </header>
  );
};

export default Header;