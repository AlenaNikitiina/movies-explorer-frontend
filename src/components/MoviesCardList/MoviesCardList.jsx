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
              />)
          })}
        </ul>
      
        <button className='cards__btn button' type='button'>Ещё</button>
      </div>
    </section>
  )
}
