import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Burger from '../Burger/Burger';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

export default function App() {
  const [menuBurgetActiv, setMenuBurgetActiv] = useState(false)

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Header />}></Route>

          <Route path='/' element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
            }
          />

          <Route path='/movies' element={
            <>
              <Header />
              <Movies />
              <Footer />
            </>
            }
          />

          <Route path="/profile" element={
            <>
              <Header />
              <Profile />
            </>
            }
          />

          <Route path="/signup" element={<Register />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Burger
        active={menuBurgetActiv}
        setActive={setMenuBurgetActiv} />
      </BrowserRouter>
    </div>
  )

}