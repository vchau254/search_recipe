import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const SearchBox = styled(Form)`
  justify-content:center;

`
export const SearchButton = styled(Button)`
  background: #8b0303;
  border: 1px solid #8b0303;
  color: #fff;

  &:focus{
    outline:none;
  }
  @media(max-width: 576px){
    margin-top: 0.5em;
  }
`


