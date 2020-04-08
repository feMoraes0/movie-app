import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function Scaffold({ children }) {
  return (
    <div className='container'>
      { children }
    </div>
  );
}

Scaffold.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Scaffold;
