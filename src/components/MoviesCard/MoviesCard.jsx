import './MoviesCard.css';

export default function MoviesCard() {
  return (
    <li className="">
      <div className='card__info'>
        <p className='card__title'></p>
        <p className='card__duration'></p>
      </div>
      <a className='card__link' href='https://www.youtube.com/watch?v=DMvFMeaGj_w' target='blank'></a>
      <button className='card__save' type='button'>Сохранить</button>
    </li>
  )
}
