import styled from 'styled-components';
import img from '../../images/header_bg.jpeg';


export const FavPage = styled.div`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
position: relative;
height: 100vh;
margin: 0 auto;
padding: 2.5em;
h5, .card-title{
    margin-bottom: 0;
}
@media(max-width: 768px){
    h5{
        font-size: 1rem
    }
    
}
`
export const PageMessage = styled.h3`
text-align: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
background-color: #ffffff;
opacity: 0.85;
font-weight: lighter;
width: 85vw;
padding: 0.5em;
@media(max-width: 586px){
    font-size: 1.25rem
}
`
