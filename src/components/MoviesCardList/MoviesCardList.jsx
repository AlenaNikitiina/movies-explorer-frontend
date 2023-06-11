import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {

  return( 
    <section className='cards'>
      <div className='cards__content'>
        <ul className='cards__list'>
          {movies.map(movie => {
            return (
              <MoviesCard
                movie={movie}
                key={movie.id}
                image={movie.image}
              />)
          })}
        </ul>
        <button className='cards__btn button' type='button'>Ещё</button>
      </div>
      
      
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