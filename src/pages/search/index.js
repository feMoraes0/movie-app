import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../../components/menu';
import Scaffold from '../../components/scaffold';
import Breadcrumb from '../../components/breadcrumb';


function Search() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [total_pages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const search = new URLSearchParams(useLocation().search);

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
    if (page < total_pages) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=27e2920c99b7658f5d89f82bc529233f&language=en-US&query=${search.get('name')}&page=${page + 1}`).then((result) => {
        setMovies([...movies, ...result.data.results]);
        setTotalPages(result.data.total_pages);
        setPage(page + 1);
      });
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [refresh, isFetching]);

  useEffect(() => {
    setRefresh(!refresh);
    setMovies([]);
    setPage(0);
    setTotalPages(1);
  }, [search.get('name')]);

  return (
    <Scaffold>
      {/* MENU */}
      <Menu />
      <div />
      {/* BODY */}
      <div className='body'>
        <Breadcrumb
          paths={[
            {
              name: 'Movies',
              url: '/',
            },
            {
              name: `Search: ${search.get('name')}`,
              url: '',
            },
          ]}
        />
        <div className='body-movies'>
          {
            movies.map((movie) => {
              if (movie.poster_path !== null) {
                return (
                  <LazyLoad key={movie.id} offset={150} once>
                    <Link to={`/details/${movie.id}`}>
                      <div className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='' />
                        <h5>{movie.title}</h5>
                      </div>
                    </Link>
                  </LazyLoad>
                );
              }
              return '';
            })
          }
        </div>
      </div>
    </Scaffold>
  );
}

export default Search;
