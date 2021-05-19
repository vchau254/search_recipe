import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Navbar, Nav } from "react-bootstrap";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { NavigationBar, Logo, NavLink } from "./navbar.style";
import logo from "../../images/logo.jpeg";

const NavBar = (props) => {
  const notHomePage = props.match.path !== "/";

  return (
    <NavigationBar expand="md">
      {/* <div className="d-flex flex-nowrap w-100"> */}
      <Logo to="/">HOME RECIPES</Logo>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/*<NavLink as={Link} to="/">
            Search Recipes
          </NavLink>*/}
          <NavLink as={Link} to="/mealplanner">
            Meal Planner
          </NavLink>
          <NavLink as={Link} to="/favorite">
            Favorite Recipes
          </NavLink>

          <NavLink as={Link} to="/contact">
            Contact Me
          </NavLink>
        </Nav>
        <AutoCompleteSearch />
        {/*{notHomePage && <AutoCompleteSearch />}*/}
      </Navbar.Collapse>
      {/* </div> */}
    </NavigationBar>
  );
};
export default withRouter(NavBar);
