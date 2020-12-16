import React from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router'
import { Navbar, Nav } from 'react-bootstrap';
import AutoCompleteSearch from '../AutoCompleteSearch';
import './CSS/style.css';

const NavBar = (props) => {
  console.log(props)
  const homePage = props.match.path !== '/';
  console.log({homePage})
  return (
    <Navbar expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          className="d-inline-block align-top logo"
          src="/logo2.png"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
        {homePage && <AutoCompleteSearch />}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(NavBar);
