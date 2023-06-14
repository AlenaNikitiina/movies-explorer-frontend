import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movieDatabase';

export default function Movies () {
  const handleSearch = () => {
    console.log('hi');
  }

  return (
    <main>
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList movies={movies} />
    </main>
  )
}
