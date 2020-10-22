import React, { Component } from 'react';

class Form extends Component {
  state = {
    value: '',
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    this.props.handleSubmit(value);
  };
  
  

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="form__input"
            value={this.state.value}
            type="text"
            onChange={this.handleChange}
            placeholder="Enter your ingredients....."
          />
          <button className="form__btn">Find a recipe</button>
        </form>

       
      </div>
    );
  }
}

export default Form;
