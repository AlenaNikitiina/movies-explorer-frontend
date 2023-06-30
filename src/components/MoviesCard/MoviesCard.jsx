import './MoviesCard.css';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie, isAllMoviesPage, saveStatus }) {
  const { nameRU, duration, trailerLink } = movie;
  
  const { savedMovies, setSavedMovies }= useContext(CurrentUserContext);
//  const [isSaved, setIsSaved] = useState(false); // сохранен ли фильм
  const [isSaved, setIsSaved] = useState(saveStatus); // сохранен ли фильм
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка
  const imageSource = 'https://api.nomoreparties.co'; // пока не связан с беком
  const { pathname } = useLocation();

  // сохранить фильм
  function handleSaveMovie () {
    setRenderLoading(true);
    //console.log('1 handleSaveMovie', '2', savedMovies, '3', movie)
    const rebuildMovieForSave = (src) =>
    { //JSON.stringify
      const rebuild = structuredClone(src);
      rebuild.image = `${imageSource}${src.image.url}`;
      rebuild.thumbnail = `${imageSource}${src.image.url}`;
      rebuild.movieId = src.id;
      delete rebuild.id;
      delete rebuild.created_at;
      delete rebuild.updated_at;
      return rebuild;
    };

    mainApi.saveMovie(rebuildMovieForSave(movie))
      .then((data) => {
        console.log("from then handleSaveMovie", data);
        console.log('setSavedMovies', setSavedMovies);
        setSavedMovies([ ...savedMovies, data ]);
        setIsSaved(true);
      })
      .catch(err => {
        console.log("Не получилось сохранить фильм", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  };
  
  const getMovieUrl = (movie) => {
    return pathname === '/movies' ? `${imageSource}${movie.image.url}` : movie.image;
  };

  // удалить фильм
  function handleDeleteMovie() {
    //console.log(movie);
    mainApi.deleteMovie(movie._id)
      .then((data) => {
        //console.log("from then handleDeleteMovie", data);
        setSavedMovies(savedMovies.filter((item) => {
          return !(item._id === movie._id);
        }));
        setIsSaved(false);
      })
      .catch(err => {
        console.log("Не получилось удалить фильм", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  return (
    <li className='card__element'>
        <div className='card__info'>
          <p className='card__title'>{nameRU}</p>
          <p className='card__duration'>{`${duration}${' минут'}`}</p>
        </div>
      
        <a
          className='card__link link'
          href={trailerLink}
          target='blank'
        >
          <img
            className='card__photo'
            src={getMovieUrl(movie)}
            alt={nameRU}
          />
        </a>
      
        <button
          className={ isAllMoviesPage
                        ? (isSaved ? 'card__saved-btn button' : 'card__save-btn button')
                        : 'card__delete-btn'}
          onClick={isSaved ? handleDeleteMovie : handleSaveMovie}
          aria-label='сохранить фильм или удалить'
          type='button'>
        </button>
    </li>
  )
}
