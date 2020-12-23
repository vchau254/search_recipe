import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const SearchBox = styled(Form)`
  justify-content:center;

`
export const SearchButton = styled(Button)`
  margin-bottom: 10px;
  background: #8b0303;
  border-color: #8b0303;
  color: #fff;

  &:focus{
    outline:none;
  }
`


