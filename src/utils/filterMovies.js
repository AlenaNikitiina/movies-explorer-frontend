import { SHORT_FILM_DURATION } from './constants';

const filterMovies = (movies, keyWord, isShort) => {
  const word = keyWord.toLowerCase().trim();

  const filteredMovies = movies
    .filter((movie) => {
      const ruName = movie.nameRU && movie.nameRU.toLowerCase().trim();
      const enName = movie.nameEN && movie.nameEN.toLowerCase().trim();
      return (ruName.match(word)) || (enName && enName.match(word));
    });

  if (isShort)
    return filteredMovies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);

  return filteredMovies;
};

export { filterMovies };