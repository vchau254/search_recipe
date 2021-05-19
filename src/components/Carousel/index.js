import React, { useState } from "react";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import {
  CasourelCaption,
  CaptionTag,
  CaptionTitle,
  CaptionDetails,
  CaptionButton,
} from "./carousel.styles";

const CarouselSlides = ({ randomRecipes }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {randomRecipes.map((randomRecipe) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={randomRecipe.image}
            alt="{randomRecipe.title}"
          />
          <Container>
            <CasourelCaption
            //  style={{ display: "flex", flexDirection: "column" }}
            >
              <CaptionTag>
                <ul>
                  {randomRecipe.diets.length > 0 &&
                    randomRecipe.diets.map((diet) => (
                      <li key={diet}>{diet}</li>
                    ))}
                </ul>
              </CaptionTag>
              <CaptionTitle className="caption-title">
                <Link to={`/recipe/${randomRecipe.id}`}>
                  {randomRecipe.title}
                </Link>
              </CaptionTitle>
              <CaptionDetails>
                <ul>
                  <li>{randomRecipe.servings} SERVING</li>
                  <li>{randomRecipe.readyInMinutes} MINS</li>
                  <li>
                    BY{" "}
                    {randomRecipe.sourceName ? randomRecipe.sourceName : "N/A"}
                  </li>
                </ul>
              </CaptionDetails>
              <CaptionButton
                classname="caption-button"
                to={`/recipe/${randomRecipe.id}`}
              >
                VIEW RECIPE
              </CaptionButton>
            </CasourelCaption>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default CarouselSlides;
