import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Scaffold from '../../components/scaffold';
import Menu from '../../components/menu';
import Breadcrumb from '../../components/breadcrumb';

function Detail() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [movie, setMovie] = useState();
  const { movie_id } = useParams();

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=27e2920c99b7658f5d89f82bc529233f&language=en-US`).then((response) => {
      setMovie(response.data);
    });
  }, [movie_id]);

  return (
    <Scaffold>
      <Menu />
      {
        (movie !== undefined) ? (
          <div className='about-body'>
            <Breadcrumb
              paths={[
                {
                  name: 'Movies',
                  url: '/',
                },
                {
                  name: movie.title,
                  url: `/details/${movie.id}`,
                },
              ]}
            />
            <div className='content'>
              <div className='movie_img'>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='movie' />
              </div>
              <div className='movie-infos'>
                <h1 className='title'>{movie.title}</h1>
                <h5 className='subtitle'>
                  <StarRatings
                    rating={movie.vote_average / 2}
                    starDimension='18px'
                    starRatedColor='rgba(95, 206, 220, 1.0)'
                    numberOfStars={5}
                    name='rating'
                  />
                &nbsp;
                  {` ${movie.vote_count} People Ratings`}
                </h5>
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
                          {element.name + ((hasNext) ? ' / ' : '')}
                        </span>
                      );
                    })
                    : null
                }
                </h4>
                <h4 className='overview'>{movie.overview}</h4>
                <ul>
                  <li>
                    <span>Release:</span>
                    {' '}
                    { `${new Date(movie.release_date).getDate()

                    } ${

                      months[new Date(movie.release_date).getMonth()]

                    } ${

                      new Date(movie.release_date).getFullYear()}`}
                  </li>
                  <li>
                    <span>Duration:</span>
                    {' '}
                    {`${Math.round(movie.runtime / 60)}h ${movie.runtime % 60}min`}
                  </li>
                  <li>
                    <span>Popularity:</span>
                    {' '}
                    {movie.popularity}
                  </li>
                </ul>
                <div className='companies'>
                  {
                  movie.production_companies.map((element) => (
                    <div key={element.id}>
                      { (element.logo_path !== null)
                        ? <img src={`https://image.tmdb.org/t/p/original/${element.logo_path}`} alt={element.name} />
                        : <p>{element.name}</p>}
                    </div>
                  ))
                }
                </div>
              </div>
            </div>
          </div>
        ) : (<p>Loading</p>)
      }
    </Scaffold>
  );
}

export default Detail;
