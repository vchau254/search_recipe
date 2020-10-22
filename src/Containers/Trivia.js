import React, { Component } from 'react';

class Trivia extends Component {
  state = { trivia: {}, isLoading: false, error: null };
  componentDidMount = async () => {
    try {
      this.setState({ isLoading: true });
      const text = await fetch(
        'https://api.spoonacular.com/food/trivia/random?&apiKey=4817974c0a5d4fe5b928123f9bed6654'
      );
      const triviaJson = await text.json();
      this.setState({ trivia: triviaJson, isLoading: false });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };
  render() {
    const { trivia, isLoading, error } = this.state;
    if (error === null) {
      return <h2>{trivia.text}</h2>;
    } else {
      return (
        <div>
          <div className="form__message">
            {error && <div>Error:{error.message}</div>}
            {isLoading && <div>Loading...</div>}
          </div>
        </div>
      );
    }
  }
}

export default Trivia;
