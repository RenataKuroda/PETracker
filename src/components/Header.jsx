import { Link } from 'react-router-dom';

import logo from "../assets/images/logo2.png"
import './Header.css'

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createpet">Add Pet</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;