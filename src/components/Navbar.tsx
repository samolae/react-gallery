import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link to="/">Main</Link> | <Link to="/history">History</Link>
  </nav>
);

export default Navbar;
