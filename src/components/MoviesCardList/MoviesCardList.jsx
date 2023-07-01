import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const currentContext = useContext(CurrentUserContext);
  const [savedMovies, setsavedMovies] = useState(currentContext.savedMovies);
  //const { savedMovies } = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  const handleShowMore = () => {
    console.log('Show More');
  }

  const checkIsSaved = (movie) => {
    const findedMovie = savedMovies.find((item) => item.movieId === (movie.movieId || movie.id));
    return findedMovie
      ? true//{ isSaved: true, id: targetMovie._id }
      : false//{ isSaved: false, id: '' }
  };

  const renderMovieCards = () => {
    if (pathname === '/movies' ) {
      return movies.map(movie =>
       (
        <MoviesCard
          movie={movie}
          isAllMoviesPage={true}
          key={movie.id}
          saveStatus={checkIsSaved(movie)}
        />));
    } else {
      return movies.map(movie =>
        (
         <MoviesCard
           movie={movie}
           isAllMoviesPage={false}
           key={movie.movieId}
           saveStatus={true}
         />));
    }

  };
  //saveStatus={{ isSaved: true, id: movie._id }}

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
