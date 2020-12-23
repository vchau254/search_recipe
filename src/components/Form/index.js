import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { SearchBox, SearchButton } from './form.style';

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
      <SearchBox inline onSubmit={this.handleSubmit}>
        <FormControl
          className="mr-sm-2 "
          type="text"
          placeholder="Enter ingredients....."
          onChange={this.handleChange}
        />
        {this.props.btnContent &&
          <SearchButton type='submit'>
            {this.props.btnContent}
          </SearchButton>}
      </SearchBox>
    );
  }
}

export default FormSearch;
