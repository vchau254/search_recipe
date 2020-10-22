import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Recipes extends Component {
  state = { showMissedIngredients: false };
  showMissedIngredients = () => {
    this.setState({ showMissedIngredients: !this.state.showMissedIngredients });
  };
  render() {
    const { recipe } = this.props;

    return (
      <div key={recipe.id} className="col-md-3">
        <div className="recipes-box">
          <img
            className="recipes-box__img"
            src={recipe.image}
            alt={recipe.title}
          ></img>
          <div className="recipes-info">
            <h3 className="recipes-info__title">
              <Link
                to={`/recipe/${recipe.id}`}
              >
                {recipe.title.length < 20
                  ? `${recipe.title}`
                  : `${recipe.title.substring(0, 25)}...`}
              </Link>
            </h3>

            {recipe.missedIngredients.length && (
              <p
                className="recipes-info__missedInfo"
                onClick={this.showMissedIngredients}
              >
                Missing ingredients:{recipe.missedIngredients.length}
              </p>
            )}

            {this.state.showMissedIngredients && (
              <div>
                {recipe.missedIngredients.map((missedIngredient) => (
                  <p>{missedIngredient.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
