import styled from 'styled-components';
import img from '../../images/header_bg.jpeg';
import { Row, Container } from 'react-bootstrap';

export const Header = styled.header`
background-image: linear-gradient(
    to right bottom,
    rgba(0, 0, 0, 0.5),
    rgba(207, 207, 207, 0.5),
    transparent
  ),
  url(${img});
height: 65vh;
font-family: "Roboto", serif;
background-size: cover;
background-position: top;
position: relative;
z-index:0;
 `

export const RandomRecipeContainer = styled(Container)`
max-width:90%;
overflow: invisible;
/*center the content*/
position:absolute;
top:50%;
left:50%;
transform: translate(-50%, -50%);

`

    ;

export const RandomRecipeContent = styled(Row)`
justify-content: center;
font-size: 1.2rem;

@media(max-width: 599px){
    font-size: 0.8rem;
    h3{
        font-size:1.2rem;
    }
}
@media(min-width: 600px) and (max-width:768px){
    font-size: 0.8rem;
    h3{
        font-size:1rem;
    }
}

`;


export const RecipesSearch = styled(Container)`
text-align: center;
margin: 1em auto;
`

export const RecipesList = styled(Row)`
justify-content:center;
`

export const Footer = styled.div`
margin-top: 1em;
text-align: center;
background-color: #8b0303;
color: white;
justify-content: center;
padding: 1em auto;
line-height: 2em;
margin-top:1em;
@media(max-width:600px){
    font-size:0.8rem
    line-height: 1em;
}
`
