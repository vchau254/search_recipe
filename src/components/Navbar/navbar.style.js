import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavigationBar = styled(Navbar)`
background-color: #e1e1e1;
opacity: 0.8;

font-size: bold;
/* display:flex;
flex-wrap:nowrap;
width:100%;
justify-content:start; */
z-index: 1; /*to be on top of the header*/

`
export const Logo = styled.img`
width: 70px;
height: 59px;
@media (min-width: 768px){
    width: 90px;
        height: 76px; 
}

`