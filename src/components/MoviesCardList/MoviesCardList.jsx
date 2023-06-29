import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const { pathname } = useLocation();

  const handleShowMore = () => {
    console.log('Show More');
  }

  const renderMovieCards = () => {
    if (pathname === '/movies' ) {
      return movies.map(movie =>
       (
        <MoviesCard
          movie={movie}
          isAllMoviesPage={true}
          key={movie.id}
          saveStatus={false}
        />));
    } else {
      console.log("saved movies", movies);
      return movies.map(movie =>
        (
         <MoviesCard
           movie={movie}
           isAllMoviesPage={false}
           key={movie.movieId}
           saveStatus={true}
         />));
    }

  };
  //saveStatus={{ isSaved: true, id: movie._id }}

  return(
    <section className='cards'>
      <div className='cards__content'>
        <ul className='cards__list'>
          {renderMovieCards()}
        </ul>
      
        <button
          className='cards__btn button'
          type='button'
          onClick={handleShowMore}>
            Ещё
        </button>
      </div>
    </section>
  )
}
