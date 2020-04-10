import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Breadcrumb({ paths }) {
  return (
    <div className='breadcrumb'>
      {
        paths.map((path, index) => (
          <Link to={path.url}>
            {path.name}
            {' '}
            {(index + 1 !== paths.length) ? ' / ' : ''}
          </Link>
        ))
      }
    </div>
  );
}

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Breadcrumb;
