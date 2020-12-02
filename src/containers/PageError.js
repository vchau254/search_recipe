import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../images/Error.jpg';
import { Container } from 'react-bootstrap';

const PageNotFound = () => {
  return (
    <Container fluid className="error-page">
      {/* <img src={Error} alt="page not found" /> */}

      <h2 style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </h2>
    </Container>
  );
};
export default PageNotFound;
