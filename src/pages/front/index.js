import React, { useState, useEffect } from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import LazyLoad from 'react-lazyload';

function Front() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  function fetchData() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=27e2920c99b7658f5d89f82bc529233f&language=en-US&page=${page + 1}`).then((result) => {
      setMovies([...movies, ...result.data.results]);
      setPage(page + 1);
    });
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(!isFetching);
  }

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  return (
    <div className='front-container'>
      {/* MENU */}
      <div className='menu'>
        <div className='user'>
          <img className='user-avatar' src='https://i7.pngguru.com/preview/748/338/407/computer-icons-avatar-person-user-avatar.jpg' alt='user avatar' />
          <p className='user-text'>Hi, Cris</p>
        </div>
        <div className='list'>
          <ul>
            <li>
              <p>Lastest Movies</p>
              <p>{movies.length}</p>
            </li>
            <li>
              <p>My Collection</p>
              <p>29</p>
            </li>
            <li>History</li>
            <li>Subscriptions</li>
            <li>Watch Later</li>
          </ul>
        </div>
      </div>
      {/* FAKE DIV FOR MENU SPACE */}
      <div />
      {/* BODY */}
      <div className='body'>
        <div className='body-header'>
          <p className='header-title'>Lastest Movies</p>
          <div className='search' id='btn-input'>
            <div id='search-icon'>
              <FiSearch size={22} color='#FFF' />
            </div>
            <input type='text' id='input' />
          </div>
        </div>
        <div className='body-movies'>
          {
          movies.map((movie, index) => (
            <LazyLoad key={movie.id} offset={150} once>
              <div className='movie-card'>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='' />
                <h5>{movie.title}</h5>
              </div>
            </LazyLoad>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Front;
