import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorPage } from './errorpage.style';

const PageNotFound = () => {
    return (
        <ErrorPage>
            <h3><Link to="/">Go back to Home Page </Link></h3>
        </ErrorPage>
    );
};
export default PageNotFound;
