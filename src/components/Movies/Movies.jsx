import { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
//import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
//import { useContext } from 'react';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies () {
  //const { savedMovies }= useContext(CurrentUserContext);
  //const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка
  const [allMovies, setAllMovies] = useState([]);
  
  function getAllMovies() {
    console.log("getAllMovies");
    moviesApi.getMovies()
      .then( (res) =>{
        if (res)
          //console.log("movies from net", res);
          //console.log("movies from base", movies);
          setAllMovies(res);
      })
      .catch ((err) => {
        console.log(err);
      })
  };
  //getAllMovies();

  useEffect(() => {
    getAllMovies();
    /*
    moviesApi.getMovies()
      .then( (res) =>{
        if (res)
          console.log("movies from net", res);
          console.log("movies from base", movies);
          setAllMovies(res);
          //return res;
      })
      .catch ((err) => {
        console.log(err);
      })
    */
  }, []);

  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={allMovies} />
    </main>
  )
}

//  {renderLoading ? <Preloader /> : renderMoviesSection()}
// {renderLoading ? <Preloader /> : ''}    add