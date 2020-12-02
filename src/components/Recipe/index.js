import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class Recipes extends Component {
  state = { showMissedIngredients: false };
  showMissedIngredients = () => {
    this.setState({ showMissedIngredients: !this.state.showMissedIngredients });
  };
  render() {
    const { recipe } = this.props;
    console.log(recipe);
    return (
      <Col xs={10} sm={4} md={3} md={4} key={recipe.id}>
        <Card bg="light">
          <Card.Img variant="top" src={recipe.image} alt="recipe" />
          <Card.Body>
            <Card.Title>
              <Link to={`/recipe/${recipe.id}`}>
                {recipe.title.length < 20
                  ? `${recipe.title}`
                  : `${recipe.title.substring(0, 25)}...`}
              </Link>
            </Card.Title>
            {recipe.missedIngredients.length && (
              <Card.Text onClick={this.showMissedIngredients}>
                Missing ingredients:{recipe.missedIngredients.length}
              </Card.Text>
            )}

            {this.state.showMissedIngredients && (
              <Card.Text>
                {recipe.missedIngredients.map((missedIngredient, index) => (
                  <p key={index}>{missedIngredient.name}</p>
                ))}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Recipes;
