import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/aboutme">About Me</Link>
                <Link to="/contact">Contact</Link>
            </nav> 
        </header>
    );
}

export default Navbar;