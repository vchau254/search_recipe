import React, { Component } from 'react';

class Form extends Component {
  state = {
    ingredients: '',
    error: null,
    isLoading: false,
  };
  handleChange = (event) => {
    this.setState({ ingredients: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { ingredients } = this.state;
    this.getRecipe(ingredients);
  };
  getRecipe = async (ingredients) => {
    const { addRecipes } = this.props;
    try {
      this.setState({
        isLoading: true,
      });
      const recipes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&limitLicense=true&ranking=1&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const recipesJson = await recipes.json(); //array of object
      this.setState({ isLoading: false });
      addRecipes(recipesJson);
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };

  render() {
    const { error, ingredients, isLoading } = this.state;
    console.log(ingredients);
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="form__input"
            value={this.state.value}
            type="text"
            onChange={this.handleChange}
            placeholder="Enter your ingredients....."
          ></input>
          <button className="form__btn">Find a recipe</button>
        </form>

        <div className="form__message">
          {error && <div>Error:{error.message}</div>}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    );
  }
}

export default Form;
