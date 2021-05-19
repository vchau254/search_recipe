import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Navbar, Nav } from "react-bootstrap";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { NavigationBar, Logo } from "./navbar.style";
import logo from "../../images/logo2.png";

const NavBar = (props) => {
  const notHomePage = props.match.path !== "/";

  return (
    <NavigationBar expand="md">
      {/* <div className="d-flex flex-nowrap w-100"> */}
      <Navbar.Brand as={Link} to="/">
        <Logo src={logo} alt="Logo" />
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
          <Nav.Link as={Link} to="/favorite">
            Favorite Recipes
          </Nav.Link>

          <Nav.Link as={Link} to="/contact">
            Contact Me
          </Nav.Link>
        </Nav>
        <AutoCompleteSearch />
        {/*{notHomePage && <AutoCompleteSearch />}*/}
      </Navbar.Collapse>
      {/* </div> */}
    </NavigationBar>
  );
};
export default withRouter(NavBar);
