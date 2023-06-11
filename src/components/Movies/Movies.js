import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import movies from '../../utils/movieDatabase';
// console.log(movies[0]);

export default function Movies () {
  const handleSubmitSearch = () => {};

  return (
    <main>
      <SearchForm handleSubmitSearch={handleSubmitSearch} />
      <MoviesCardList movies={movies} />
    </main>
  )
};
