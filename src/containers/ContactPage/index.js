import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { ContactPage, ContactForm } from './contactpage.style';



const ContactMe = () => {
    return (
        <ContactPage>
            <ContactForm>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' placeholder='First Name'></Form.Control>
                </Form.Group>   
                <Form.Group> 
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
                <Button variant="outline-success" type="submit">
                    Submit
                </Button>
            </ContactForm>
        </ContactPage>

    );

};
export default ContactMe;
