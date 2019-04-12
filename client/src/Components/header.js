// import React, { Component } from 'react';
// import './header.css';

// class Header extends Component {
//     render() {
//       return (<div id="div1"><h1 id="head1">Welcome to Chat - It!</h1></div>);
//     }
// }
// export default Header;
import React from "react";
import { Link } from "react-router-dom";

// type Props = {
//   style: React.CSSProperties,
//   extras: React.ReactHTML
// };

const Header = () => {
  return (
    <header className="App-header">
      <Link className="App-title" to="/">Realtime Code Share</Link>
      {/* <div className="extras">{props.extras}</div> */}
    </header>
  );
};

export default Header;