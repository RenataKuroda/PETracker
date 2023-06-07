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

    function handleLogoClick() {
      navigate('/');
    }

  return (
    <header>
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      {user && (
      <nav>
        
      <button onClick={handleSignOut}>Sign out</button>

      </nav>
      )}
    </header>
  );
}

export default Header;