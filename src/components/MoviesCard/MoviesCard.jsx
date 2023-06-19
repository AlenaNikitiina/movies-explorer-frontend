import { useState } from 'react';
import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const { nameRU, duration, trailerLink, image } = movie;
  const imageSource = 'https://api.nomoreparties.co'; // пока не связан с беком

  const [isSaved, setIsSaved] = useState(false); // сохранен ли фильм
  const handleSaveMovie = () => setIsSaved(true);
  const handleDeleteMovie = () => setIsSaved(false);

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
            src={`${imageSource}${image.url}`}
            alt={nameRU}
          />
        </a>
      
        <button
          className={ isSaved ? 'card__delete-btn button' : 'card__save-btn button'}
          onClick={isSaved ? handleDeleteMovie : handleSaveMovie}
          aria-label='сохранить фильм'
          type='button'>
        </button>

    </li>
  )
}

// className='card__saved-btn button'