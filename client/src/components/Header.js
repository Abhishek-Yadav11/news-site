import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categories/sports">Sports</Link>
        <Link to="/categories/technology">Technology</Link>
        <Link to="/categories/business">Business</Link>
      </nav>
    </header>
  );
};

export default Header;
