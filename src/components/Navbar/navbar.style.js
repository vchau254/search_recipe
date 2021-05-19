import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = styled(Navbar)`
  background-color: #f4e4e0;
  opacity: 0.8;
  font-size: bold;
  color: #45334f;
  z-index: 1; /*to be on top of the header*/
  /* @media (min-width: 768px){
    font-size: 1.3rem; */
  /*}*/
`;
export const Logo = styled(Link)`
  font-family: "Fredoka One", cursive;
  color: #45334f;
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  text-decoration: none;
  background-color: transparent;
`;

export const NavLink = styled(Link)`
  color: #45334f;
  font-weight: bolder;
  @media (min-width: 768px) {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
`;
