import { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
//import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/filterMovies';
import moviesApi from '../../utils/MoviesApi';
//import { useContext } from 'react';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies () {
  const [keyWordState, setKeyWordState] = useState('');
  const [isShortMoviesState, setIsShortMoviesState] = useState(false);
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка
  const [searchedMovies, setSearchedMovies] = useState([]);
  const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];
  const [errorMessage, setErrorMessage] = useState('');


  const getFilteredMovies = (keyWord, isShortMovies) => {
    function setupFilteredFilms(movies) {
      setSearchedMovies(movies);
      localStorage.setItem('storageSearchResult', JSON.stringify(movies));
      movies.length === 0
        ? setErrorMessage('NOT_FOUND')
        : setErrorMessage('');
    };

    console.log(storageAllMovies);
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
          console.log(err);
          setErrorMessage('SEARCH_ERROR');
        })
        .finally(() => setRenderLoading(false));
    } else {
      const filteredMovies = keyWord
        ? filterMovies(storageAllMovies, keyWord, isShortMovies)
        : [];
      setupFilteredFilms(filteredMovies);
    }
  };

  const handleSubmitSearch = (keyWord) => {
    setKeyWordState(keyWord);
    //localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMoviesState);
    console.log("handleSubmitSearch", keyWord);
  };

  const handleChangeCheckbox = (isChecked) => {
    console.log("handleChangeCheckbox", isChecked)
    setIsShortMoviesState(isChecked);
    //localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWordState, isChecked);
  };

  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <MoviesCardList movies={searchedMovies} />
    </main>
  )
}

//  {renderLoading ? <Preloader /> : renderMoviesSection()}
// {renderLoading ? <Preloader /> : ''}    add