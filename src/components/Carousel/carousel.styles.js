import styled from "styled-components";
import { Link } from "react-router-dom";

export const CasourelCaption = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0;
  left: 15%;
  z-index: 10;
  transform: translateY(-50%);
  top: 45%;
  line-height: 1;
  @media only screen and (min-width: 480px) and (max-width: 992px) {
    top: 55%;
    li {
      font-size: 1rem;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
  }
  ul {
    list-style: none;
    margin-bottom: 0;
  }
  li {
    font-size: 0.8rem;
    display: inline-block;
    margin-right: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const CaptionTag = styled.div`
  ul {
    margin: 0;
  }
  li {
    background-color: #62bcb8;
    padding: 0.5rem;
  }
`;

export const CaptionTitle = styled.h2`
  margin: 0;
  line-height: 1;

  a {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
    :hover,
    :active {
      background-color: #62bcb8;
      color: #fff;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 992px) {
    margin-bottom: 1rem;

    a {
      font-size: 2rem;
    }
  }
  @media only screen and (min-width: 993px) {
    margin-bottom: 1rem;
    a {
      font-size: 3rem;
    }
  }
`;

export const CaptionDetails = styled.div`
  ul {
    margin-left: 0;
    padding-left: 0;
  }
  li {
    font-weight: 700;
    margin-top: 0.75em;
    margin-right: 0;
    padding-left: 0;
  }
`;
export const CaptionButton = styled(Link)`
  border: 2px solid #fff;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.5em 0;
  width: 130px;
  text-align: center;
  -webkit-transition: all 0.2s ease-in-out !important;
  -moz-transition: all 0.2s ease-in-out !important;
  -o-transition: all 0.2s ease-in-out !important;
  -ms-transition: all 0.2s ease-in-out !important;
  transition: all 0.2s ease-in-out !important;
  margin-top: 1em;
  :hover,
  :active {
    background-color: #62bcb8;
    color: #fff;
  }
  @media only screen and (max-width: 993px) {
    margin-top: 0;
  }
`;
