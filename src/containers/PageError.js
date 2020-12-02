import React from 'react';
import Error from '../images/Error.jpg';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const PageNotFound = () => {
  return (
    <Container fluid className="error-page">
      <Row>
        <Col xs={12} sm={12} md={12}>
          <img src={Error} alt="page not found" />
        </Col>
        <Col>
          <Link to="/">Go to Home </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default PageNotFound;
