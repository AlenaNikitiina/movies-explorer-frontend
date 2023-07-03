import './MoviesCard.css';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Message } from '../../utils/constants';

export default function MoviesCard({ movie, isAllMoviesPage, saveStatus }) {
  const { nameRU, duration, trailerLink } = movie;
  const { savedMovies, setSavedMovies }= useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(saveStatus.isSaved); // сохранен ли фильм
  const [saveId, setSaveId] = useState(saveStatus.id);
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка
  const imageSource = 'https://api.nomoreparties.co';
  const { pathname } = useLocation();

  // сохранить фильм
  function handleSaveMovie () {
    setRenderLoading(true);

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
        setSavedMovies([ ...savedMovies, data ]);
        setIsSaved(true);
        setSaveId(data._id);
      })
      .catch(err => {
        console.log(Message.CANT_SAVE, err);
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
    mainApi.deleteMovie(saveId)
      .then((data) => {
        setSavedMovies(savedMovies.filter((item) => {
          return !(item._id === saveId);
        }));
        setIsSaved(false);
      })
      .catch(err => {
        console.log(Message.CANT_DELETE, err);
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
        aria-label='сохранить или удалить фильм'
        type='button'
      />
    </li>
  )
}
