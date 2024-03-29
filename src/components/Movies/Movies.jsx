import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/filterMovies';
import moviesApi from '../../utils/MoviesApi';
import { Message } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies () {
  const [keyWordState, setKeyWordState] = useState('');
  const [isShortMoviesState, setIsShortMoviesState] = useState(false);
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка
  const [searchedMovies, setSearchedMovies] = useState([]);
  const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];
  const [errorMessage, setErrorMessage] = useState('');
  const { savedMovies }= useContext(CurrentUserContext);

  useEffect(() => {
    // извлекаем сохраннёное состояния из локального хранилища
    const storageSearchResult = JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
    const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort')) || false;

    storageSearchResult && setSearchedMovies(storageSearchResult);
    storageKeyWord && setKeyWordState(storageKeyWord);
    storageIsShort && setIsShortMoviesState(storageIsShort);
  }, []);

  const getFilteredMovies = (keyWord, isShortMovies) => {
//  console.log('Ничего не найдено');
    function setupFilteredFilms(movies) {
      setSearchedMovies(movies);
      localStorage.setItem('storageSearchResult', JSON.stringify(movies));
      movies.length === 0
        ? setErrorMessage(Message.NOT_FOUND)
        : setErrorMessage('');
    };

    if (storageAllMovies.length === 0) {
      setRenderLoading(true);
      moviesApi.getMovies()
        .then((allMovies) => {
          localStorage.setItem('storageAllMovies', JSON.stringify(allMovies));
          const filteredMovies = keyWord
            ? filterMovies(allMovies, keyWord, isShortMovies)
            : [];
          setupFilteredFilms(filteredMovies);
        })
        .catch((err) => {
          setErrorMessage(Message.REQUEST_ERROR, err);
        })
        .finally(() => setRenderLoading(false));
    } else {
      const filteredMovies = keyWord
        ? filterMovies(storageAllMovies, keyWord, isShortMovies)
        : [];
      setupFilteredFilms(filteredMovies);
    }
  };

  useEffect(() => {
    getFilteredMovies(keyWordState, isShortMoviesState);
   }, [savedMovies]
  );

  const handleSubmitSearch = (keyWord) => {
    setKeyWordState(keyWord);
    // сохраняем в локальное хранилище, чтобы извлечь состояние
    // при следующем монтировании компонента
    localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMoviesState);
  };

  const handleChangeCheckbox = (isChecked) => {
    setIsShortMoviesState(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWordState, isChecked);
  };

  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
        showError={setErrorMessage}
      />
      {renderLoading ? <Preloader /> : ''} 
      {errorMessage.length!==0 ? <p className='cards__search-message'>{errorMessage}</p> : <MoviesCardList movies={searchedMovies} />}
    </main>
  )
}
