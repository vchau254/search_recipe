import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import img from '../../images/header_bg.jpeg';

export const ContactPage = styled.div`
margin: 0 auto;
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
padding: 1em;
height: 100vh;
padding: 2.5em;
@media (min-width: 769px){
    font-size: 1.5rem;
}
`
export const ContactForm = styled(Form)`
  margin: 0 auto;
  border-radius: 15px;
  padding: 2em;
  background-color: #fff;
  opacity: 0.9;
  width: 75%;
  button{
      width: 100%;
  }
  @media(max-width: 586px){
      width: 85%;
  }

`