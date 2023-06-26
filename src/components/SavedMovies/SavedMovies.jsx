import { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
//import movies from '../../utils/movieDatabase';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({ loggedIn }) {
  const { savedMovies }= useContext(CurrentUserContext);
  
  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={savedMovies} loggedIn={loggedIn} />
    </main>
  )
}