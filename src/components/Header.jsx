import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';
import logo from "../assets/images/logo2.png"
import './Header.css'

function Header() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await logout()
    }

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
        <div>
        <p>Welcome!</p>
        {/* conditional for user */}
        <button onClick={handleSignOut}>Sign out</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;