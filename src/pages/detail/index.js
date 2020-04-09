import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Scaffold from '../../components/scaffold';
import Menu from '../../components/menu';

function Detail() {
  const [movie, setMovie] = useState([]);
  const { movie_id } = useParams();

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=27e2920c99b7658f5d89f82bc529233f&language=en-US`).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return (
    <Scaffold>
      <Menu />
      {
        (movie !== undefined) ? (
          <div className='about-body'>
            <div>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='movie' />
            </div>
            <div className='movie-infos'>
              <h1 className='title'>{movie.title}</h1>
              <h5 className='subtitle'>{`${movie.vote_count} People Ratings`}</h5>
              <h4>
                {
                  (movie.genres !== undefined)
                    ? movie.genres.map((element, index) => {
                      const hasNext = (index < movie.genres.length - 1);
                      return (
                        <span key={element.name}>
                          {element.name + ((hasNext) ? ' / ' : '')}
                        </span>
                      );
                    })
                    : null
                }
              </h4>
              <h4>
                {
                  (movie.spoken_languages !== undefined)
                    ? movie.spoken_languages.map((element, index) => {
                      const hasNext = (index < movie.spoken_languages.length - 1);
                      return (
                        <span key={element.name}>
                          {element.name + ((hasNext) ? ' - ' : '')}
                        </span>
                      );
                    })
                    : null
                }
              </h4>
              <h4 className='overview'>{movie.overview}</h4>
            </div>
          </div>
        ) : (<p>Loading</p>)
      }
    </Scaffold>
  );
}

export default Detail;
