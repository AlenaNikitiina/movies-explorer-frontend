import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import Register from '../Register/Register';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';


export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
        <SearchForm />
        <Register />
        <Login />
      </BrowserRouter>
    </div>
  )

}
// <MoviesCardList />