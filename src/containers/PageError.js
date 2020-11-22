import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../images/Error.jpg';
const PageNotFound = () => {
  return (
    <div>
      <img src={Error} alt="404 error" />
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};
export default PageNotFound;
