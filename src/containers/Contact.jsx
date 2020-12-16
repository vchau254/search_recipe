import React from 'react';
import NavBar from '../components/NavBar';
import {Form, Button} from 'react-bootstrap';


const ContactMe = () => {
  return(
    <div className='contact-form'>
      <NavBar/>
      <Form>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type='text' placeholder='First Name'></Form.Control>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type='text' placeholder='Last Name'></Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" /> 
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Message for me</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
   </Form>
    </div>
    
  );
   
};
export default ContactMe;
