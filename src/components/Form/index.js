import React, { Component } from 'react';
import { Form, FormControl,Button } from 'react-bootstrap';

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
        {this.props.btnContent && 
        <Button variant="dark" type='submit'>
          {this.props.btnContent}
        </Button>}
      </Form>
    );
  }
}

export default FormSearch;
