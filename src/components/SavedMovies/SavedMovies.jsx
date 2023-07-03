import { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/filterMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({ loggedIn }) {
  const [keyWordState, setKeyWordState] = useState('');
  const [isShortMoviesState, setIsShortMoviesState] = useState(false);
  const [movies, setMovies] = useState([]);
  const { savedMovies }= useContext(CurrentUserContext);
  
  const getFilteredMovies = (keyWord, isShort) => {
    const filteredMovies = filterMovies(savedMovies, keyWord, isShort);
    //filteredMovies.length === 0 ? setErrorMessage(SearchMessage.NOT_FOUND) : setErrorMessage('');
    //!savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED) : setErrorMessage('');
    //setMovies(filteredMovies);
    setMovies(filteredMovies);
  };

  useEffect(() => {
    setMovies(savedMovies);
    getFilteredMovies(keyWordState, isShortMoviesState);
    //!savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED) : setErrorMessage('');
  }, [savedMovies]);

  const handleSubmitSearch = (keyWord) => {
    setKeyWordState(keyWord);
    getFilteredMovies(keyWord, isShortMoviesState);
  };

  const handleChangeCheckbox = (isChecked) => {
    setIsShortMoviesState(isChecked);
    getFilteredMovies(keyWordState, isChecked);
  };


  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <MoviesCardList movies={movies} loggedIn={loggedIn} />
    </main>
  )
};