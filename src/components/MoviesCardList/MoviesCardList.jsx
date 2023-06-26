import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const { pathname } = useLocation();

  const handleShowMore = () => {
    console.log('Show More');
  }

  const renderMovieCards = () => {
    if (pathname === '/movies' ) {
    return movies.map(movie =>
       (
        <MoviesCard
          movie={movie}
          key={movie.id}
        />));
    } else {
      console.log("saved movies", movies);
      return movies.map(movie =>
        (
         <MoviesCard
           movie={movie}
           key={movie.movieId}
         />));
    }

  };

  return(
    <section className='cards'>
      <div className='cards__content'>
        <ul className='cards__list'>
          {renderMovieCards()}
        </ul>
      
        <button
          className='cards__btn button'
          type='button'
          onClick={handleShowMore}>
            Ещё
        </button>
      </div>
    </section>
  )
}
