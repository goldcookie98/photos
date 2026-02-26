import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">
                JAKE HARDEN
            </Link>

            <nav>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            NocturnLDN
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ConductLDN" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            ConductLDN
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/VantaLDN" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            VantaLDN
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="social-links">
                {/* Placeholders for social icons if needed */}
                <span style={{ fontSize: '0.8rem', color: '#999' }}>IG</span>
            </div>
        </header>
    );
};

export default Header;
