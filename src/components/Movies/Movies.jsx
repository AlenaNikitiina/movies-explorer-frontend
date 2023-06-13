import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import movies from '../../utils/movieDatabase';
import Header from '../Header/Header';

export default function Movies () {

  const handleSubmitSearch = () => {
    console.log('hi');
  };

  return (
    <main>
      <SearchForm handleSubmitSearch={handleSubmitSearch} />
      <MoviesCardList movies={movies} />
    </main>
  )
}
