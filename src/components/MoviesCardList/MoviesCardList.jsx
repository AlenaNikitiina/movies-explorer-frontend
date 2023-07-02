import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Breakpoint, Length } from '../../utils/constants';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const { pathname } = useLocation();
  const currentContext = useContext(CurrentUserContext);
  const [savedMovies, setsavedMovies] = useState(currentContext.savedMovies);
  const [cardsCountToShow, setCardsCountToShow] = useState(0);
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResizeWindow = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= Breakpoint.MOBILE) {
      setCardsCountToShow(Length.MOBILE);
    } else if (windowWidth <= Breakpoint.TABLET) {
      setCardsCountToShow(Length.TABLET);
    } else {
      setCardsCountToShow(Length.DESKTOP);
    }
  }, [windowWidth, movies.length]);

  useEffect(() => {
    if (pathname === '/movies' ) {
      setIsMoreButton(movies.length > cardsCountToShow);
    } else {
      setIsMoreButton(false);
    }
  }, [pathname, movies.length, cardsCountToShow]);

  const handleShowMore = () => {
    setCardsCountToShow((current) => {
      return current + (windowWidth <= Breakpoint.TABLET ? 2 : 3);
    })
  }

  const checkIsSaved = (movie) => {
    const findedMovie = savedMovies.find((item) => item.movieId === (movie.movieId || movie.id));
    return findedMovie
      ? { isSaved: true, id: findedMovie._id }
      : { isSaved: false, id: '' }
  };

  const renderMovieCards = () => {
    function renderAllMoviesPage(movies) {
      return movies.slice(0, cardsCountToShow).map(movie =>
        (
         <MoviesCard
           movie={movie}
           isAllMoviesPage={true}
           key={movie.id}
           saveStatus={checkIsSaved(movie)}
         />
        ));
    }

    function renderSavedMoviesPage(movies) {
      return movies.map(movie =>
        (
         <MoviesCard
           movie={movie}
           isAllMoviesPage={false}
           key={movie.movieId}
           saveStatus={{isSaved: true, id: movie._id}}
         />
        ));
    }

    return (pathname === '/movies') ? renderAllMoviesPage(movies) : renderSavedMoviesPage(movies);
  };

  return(
    <section className='cards'>
      <div className='cards__content'>
        <ul className='cards__list'>
          {renderMovieCards()}
        </ul>
        {isMoreButton ?
          <button
            className='cards__btn button'
            type='button'
            onClick={handleShowMore}>
              Ещё
          </button> : '' }
      </div>
    </section>
  )
}
