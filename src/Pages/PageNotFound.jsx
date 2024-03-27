import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="home-banner">
            <div className="container">
                <div className="banner-wrapper">
                    <div className="content">
                        <h1>Page Not Found</h1>
                        <Link className="btn" to={'/products'}><FontAwesomeIcon icon={faShoppingBag} />Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
  );
};
