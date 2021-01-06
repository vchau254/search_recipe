import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import image from '../../images/header_bg.jpeg';

export const RecipePage = styled(Container)`
background-image: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.5),
      rgba(207, 207, 207, 0.5),
      transparent
    ),
    url(${image});
  background-size: cover;
  padding: 2em;
  font-size: 1rem;
  
`
export const RecipeContent = styled(Container)`
background-color: #fff;
  opacity: 0.9;
  margin: 0 auto;

  h1{
  padding-top: 0.5em;
  font-weight: 700;
  line-height: 1.25em;
  font-size: 2.5rem;
  }

  img{
  width: 100%;
  margin: 0.5em auto;
  }
  p{
  font-weight: bold;
  font-size: 0.8rem;
  margin: 0;
  }
  ul,ol {
  margin-left: 1em;
  }
  @media (max-width: 575px) {
    width: 95%;
    font-size: 0.8rem;
    h1{
        font-size: 1.5rem;
    }
    h5{
        font-size: 1rem;
    }
    
  }
  @media (min-width: 576px) {
    padding-left: 2.5em;
  }
  @media (min-width: 992px) {
    width: 75%;
    margin: 0 auto;
  }
  @media (min-width: 1200px) {
    width: 65%;
    
  }
`

export const RecipeInfo = styled(Col)`
border-right: 1px solid lightgrey;
:last-child {
  border-right: none;
}
@media (max-width: 575px) {
:first-child,
 :nth-child(2) {
    margin-bottom: 1em;
  }
  :nth-child(2){
    border: none;
  }
}
`
export const RecipeNutrition = styled(Col)`
border-radius: 5px;
  background-color: #b1e1d0;
  margin: 0.5em auto;
  text-align: center;

  @media(max-width: 575px){
    padding: 0.25em;
    p{
        font-size: 0.7rem;
    }
    :first-child {
    margin-left: 1em;
  }
  }
  @media (min-width: 576px) {
    margin-left: 0.5em;
  }
  @media (min-width: 768px) {
    text-align: center;
    :first-child {
    margin-top: 2em;
  }
}
  @media (min-width: 992px) {
    :first-child {
    margin-top: 2.5em;
  }
  }
  @media (min-width: 1200px) {
    :first-child {
    margin-top: 3.5em;
  }
  }
`
export const RecipeInstructions = styled(Row)`
margin-top: 1em;
`