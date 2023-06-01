import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>My Pet Care</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;