import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const NavigationBar = styled(Navbar)`
z-index: 1; /*to be on top of the header*/
    .logo{
        width: 15%;
    }

@media only screen and (max-width: 768px) {
    .logo{
        width:20%;  
    }
    font-size: 0.8rem;
}

`