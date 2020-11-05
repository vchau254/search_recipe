import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/style.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Search Recipe <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trivia" className="nav-link">
              Trivia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mealplanner" className="nav-link">
              Meal Planner
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
