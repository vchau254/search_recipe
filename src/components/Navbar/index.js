import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './CSS/style.css';

const NavBar = () => {
  return (
    <Navbar expand="md lg">
      <Navbar.Brand as={Link} to="/">
        <img
          className="d-inline-block align-top logo"
          src="/logo2.png"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto navbar-left">
          <Nav.Link as={Link} to="/">
            Search Recipe
          </Nav.Link>
          <Nav.Link as={Link} to="/mealplanner">
            Meal Planner
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact Me
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
