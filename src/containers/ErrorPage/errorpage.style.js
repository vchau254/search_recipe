import styled from 'styled-components';
// import { Container, Row, Col } from 'react-bootstrap';
import Error from '../../images/Error.jpg';

export const ErrorPage = styled.div`
background-image: url(${Error});
background-repeat:no-repeat;
background-size:contain;
background-position:center;
text-align: center;
height: 85vh;
position: relative;

h3{
    position: absolute;
    bottom: 8%;
    right: 50%;
    transform: translate(50%, -50%);
}

a{
    color: #F89320;
    text-decoration: underline;
}
a:hover{
    color: blue;
}

`