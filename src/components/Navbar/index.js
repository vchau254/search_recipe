import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap';
import AutoCompleteSearch from '../AutoCompleteSearch';
import { NavigationBar } from './navbar.style';


const NavBar = (props) => {

  const notHomePage = props.match.path !== '/';

  return (
    <NavigationBar expand="md">
      <div className="d-flex flex-nowrap w-100">
        <Navbar.Brand as={Link} to="/">
          <img
            className="d-inline-block align-top logo"
            src="/logo2.png"
            alt="logo"

          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

      </div>
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
        {notHomePage && <AutoCompleteSearch />}
      </Navbar.Collapse>
    </NavigationBar>
  );
};
export default withRouter(NavBar);
