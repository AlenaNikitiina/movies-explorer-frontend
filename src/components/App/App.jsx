import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <Main />
      <Footer />
      <NotFound />
      
    </div>
  )

}
// <MoviesCardList />