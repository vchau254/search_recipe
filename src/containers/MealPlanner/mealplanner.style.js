
import styled from 'styled-components';
import img from '../../images/header_bg.jpeg';

export const MealPlanWrapper = styled.div`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
padding: 2.5em;
height: 100vh;

`

export const MealSearchContainer = styled.div`
width:85%;
opacity: 0.8;
background-image: linear-gradient(
    to right bottom,
    #a9ba9d,
    #e2e6e9,
    transparent
  );
margin: 1em auto;
padding: 1em;
@media(max-width: 600px){
    font-size: 0.8rem;
    
}

img{
    min-height: 2rem;
    vertical-align:middle;
    max-width: 40px;
    max-height:40px;
    margin-left:auto;
    margin-right:auto;

}
@media(min-width:601px and max-width:768px){
    font-size:0.8rem;
    
}
`;

export const MealPlanTitle = styled.div`
text-align:center;
margin: 1em auto;
font-size: 1.25rem;
`