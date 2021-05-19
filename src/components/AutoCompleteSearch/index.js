import React, { useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { Form, FormControl } from "react-bootstrap";

const AutoCompleteSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [autoCompleteRecipes, setAutoCompleteRecipes] = useState([]);
  //fetch auto complete api
  const getAutoComplete = async (ingredients) => {
    const suggestedList = await fetch(
      `https://api.spoonacular.com/recipes/autocomplete?query=${ingredients}&number=10&apiKey=4817974c0a5d4fe5b928123f9bed6654`
    );
    const suggestedListJson = await suggestedList.json();
    setAutoCompleteRecipes(suggestedListJson);
  };

  //call API when user pauses typing for 5 secons
  const autoComplete = debounce(
    (recipeTitle) => getAutoComplete(recipeTitle),
    500
  );
  //listen to input onChange and pass the value to call auto complete api
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    autoComplete(e.target.value);
  };
  //clear the auto complete search and input value field on blur event
  const handleBlurEvent = () => {
    setInputValue("");
    setAutoCompleteRecipes([]);
  };

  
  return (
    <div>
      <Form inline>
        <FormControl
          className="mr-sm-2"
          type="text"
          placeholder="Enter ingredients....."
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlurEvent}
        />
      </Form>
      <div
        className="recipes-suggested"
        style={{
          position: "absolute",
          paddingLeft: "0.5em",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        {inputValue &&
          autoCompleteRecipes.map((recipe) => (
            <div key={recipe.id} style={{ display: "block" }}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AutoCompleteSearch;
