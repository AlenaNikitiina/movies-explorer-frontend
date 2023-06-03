import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {

  return(
    <section className='cards'>
      <div className='cards__content'>
        <ul className='card__list'>
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </ul>
      </div>
      <button className='cards__btn button' type='button'>Ещё</button>
    </section>
  )
}

/*
{cards.map(card => {
  return (
    <Card
      card={card}
      key={card._id}
      name={card.name}
      link={card.link}
      likes={card.likes}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onClickDeleteCard={onClickDeleteCard}
    />)
})}
*/