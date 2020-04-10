import React from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';
// import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

function Menu() {
  return (
    <div className='menu'>
      <img src='../assets/logo-movie-app.png' alt='logo' />
      <div className='search-bar'>
        <input type='text' placeholder='Search...' />
        <button type='button'>
          <FiSearch size={22} />
          &nbsp;
        </button>
      </div>
    </div>
  );
}

export default Menu;
