import './MoviesCard.css';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie, isAllMoviesPage, saveStatus }) {
  const { nameRU, duration, trailerLink } = movie;
  
  const { savedMovies, setSavedMovies }= useContext(CurrentUserContext);
//  const [isSaved, setIsSaved] = useState(false); // сохранен ли фильм
  const [isSaved, setIsSaved] = useState(saveStatus.isSaved); // сохранен ли фильм
  const [saveId, setSaveId] = useState(saveStatus.id);
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
      //console.log("rebuildMovieForSave, ", rebuild, src);
      return rebuild;
    };

    mainApi.saveMovie(rebuildMovieForSave(movie))
      .then((data) => {
        console.log("from then handleSaveMovie", data);
        setSavedMovies([ ...savedMovies, data ]);
        setIsSaved(true);
        setSaveId(data._id);
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
    console.log(movie);
    mainApi.deleteMovie(saveId)
      .then((data) => {
        //console.log("from then handleDeleteMovie", data);
        setSavedMovies(savedMovies.filter((item) => {
          return !(item._id === saveId);
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
