import React, { useState, useEffect } from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

function Front() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key={KEY_HERE}&language=en-US&page=${page}`).then((result) => {
      setMovies([...movies, ...result.data.results]);
      setPage(result.data.page);
      console.log(result);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className='front-container'>
    <div className='menu'>
      <div className="user">
        <img className='user-avatar' src="https://i7.pngguru.com/preview/748/338/407/computer-icons-avatar-person-user-avatar.jpg" alt="user avatar"/>
        <p className='user-text'>Hi, Cris</p>
      </div>
      <div className='list'>
        <ul>
          <li>
            <p>Trending Movies</p>
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
    <div className='body'>
      <div className="body-header">
        <p className='header-title'>Trending Movies</p>
        <div className='search' id='btn-input'>
          <div id="search-icon">
            <FiSearch size={22} color='#FFF' />
          </div>
          <input type="text" id='input'/>
        </div>
      </div>
      <div className='body-movies'>
        {
          movies.map((movie) => {
            let poster = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
            return (
              <div className='movie-card'>
                <img src={poster} alt=""/>
                <h5>{movie.title}</h5>
              </div>
            );
          })
        }
      </div>
    </div>
    </div>
  );
}

export default Front;