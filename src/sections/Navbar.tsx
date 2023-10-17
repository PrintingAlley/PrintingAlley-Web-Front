import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link to="/print-shop">Print Shop</Link>
    <Link to="/bookmark">Bookmark</Link>
    <Link to="/tag">Tag</Link>
    <Link to="/auth">Auth</Link>
  </nav>
);

export default Navbar;
