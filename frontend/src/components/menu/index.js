import React, { useState } from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

function Menu() {
  const [search, setSearch] = useState('');
  const history = useHistory();

  function send(event) {
    event.preventDefault();
    history.replace(`/search?name=${search}`);
  }

  return (
    <div className='menu'>
      <img src='../assets/logo-movie-app.png' alt='logo' />
      <form onSubmit={send}>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type='submit'>
            <FiSearch size={22} />
            &nbsp;
          </button>
        </div>
      </form>
    </div>
  );
}

export default Menu;
