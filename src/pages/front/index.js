import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import Menu from '../../components/menu';
import Scaffold from '../../components/scaffold';
import Breadcrumb from '../../components/breadcrumb';

function Front() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

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
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=27e2920c99b7658f5d89f82bc529233f&language=en-US&page=${page + 1}`).then((result) => {
      setMovies([...movies, ...result.data.results]);
      setPage(page + 1);
    });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  return (
    <Scaffold>
      {/* MENU */}
      <Menu />
      {/* BODY */}
      <div className='body'>
        <Breadcrumb
          paths={[
            {
              name: 'Movies',
              url: '/',
            },
          ]}
        />
        <div className='body-movies'>
          {
          movies.map((movie) => (
            <LazyLoad key={movie.id} offset={150} once>
              <Link to={`/details/${movie.id}`}>
                <div className='movie-card'>
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='' />
                  <h5>{movie.title}</h5>
                </div>
              </Link>
            </LazyLoad>
          ))
        }
        </div>
      </div>
    </Scaffold>
  );
}

export default Front;
