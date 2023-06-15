import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movieDatabase';

export default function Movies () {
  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
