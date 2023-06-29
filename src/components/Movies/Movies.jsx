import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movieDatabase';
//import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
//import { useContext } from 'react';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies () {
  //const { savedMovies }= useContext(CurrentUserContext);
  const getAllMovies = () => {
    moviesApi.getMovies()
      .then( (res) =>{
        if (res)
          console.log("movies from net", res);
          console.log("movies from base", movies);
          return res;
      })
      .catch ((err) => {
        console.log(err);
      })
  };
  //getAllMovies();

  return (
    <main>
      <SearchForm />
     
      <MoviesCardList movies={movies} />
    </main>
  )
}

//  {renderLoading ? <Preloader /> : renderMoviesSection()}
// {renderLoading ? <Preloader /> : ''}