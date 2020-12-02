import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';

class FormSearch extends Component {
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
    console.log(this.props);
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormControl
          className="mr-sm-2 "
          type="text"
          placeholder="Enter ingredients....."
          onChange={this.handleChange}
        />
      </Form>
      // <div>
      //   <form className="form" }>
      //     <input
      //       className="form__input"
      //       value={this.state.value}
      //       type="text"
      //       onChange={this.handleChange}
      //       placeholder="Enter your ingredients....."
      //     />
      //     <button className="form__btn">{this.props.btnContent}</button>
      //   </form>
      // </div>
    );
  }
}

export default FormSearch;
