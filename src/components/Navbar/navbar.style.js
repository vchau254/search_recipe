import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavigationBar = styled(Navbar)`
background-color: #e8e7e5;
opacity: 0.8;
font-size: bold;
color: black;
z-index: 1; /*to be on top of the header*/
/* @media (min-width: 768px){
    font-size: 1.3rem; */
}

`
export const Logo = styled.img`
width: 70px;
height: 59px;
@media (min-width: 768px){
    width: 90px;
    height: 76px; 
}

`