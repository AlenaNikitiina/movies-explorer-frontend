import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const { nameRU, duration, trailerLink, image } = movie;
  console.log(movie);

  return (
    <li className='card__element'>
      
        <div className='card__info'>
          <p className='card__title'>{nameRU}</p>
          <p className='card__duration'>{duration}</p>
        </div>
      
        <a
          className='card__link link'
          href={trailerLink}
          target='blank'
        >
          <img
            className='card__photo'
            src={image}
            alt={nameRU}
          />
        </a>
      
        <button
          className='card__save button'
          type='button'>
          Сохранить
        </button>

    </li>
  )
}
