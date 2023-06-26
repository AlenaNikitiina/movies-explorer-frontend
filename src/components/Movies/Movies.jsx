import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movieDatabase';
//import { useContext } from 'react';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies () {
  //const { savedMovies }= useContext(CurrentUserContext);

  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
