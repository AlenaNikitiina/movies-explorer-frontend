import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Header from '../Header/Header';
//import Burger from '../Burger/Burger';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

export default function App() {
  // временно <Header loggedIn={true} />
  const [loggedIn, setLoggedIn] = useState(false);
  //const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<Header />}></Route>

          <Route path='/' element={
            <>
              <Header loggedIn={loggedIn}/>
              <Main loggedIn={loggedIn}/>
              <Footer />
            </>
            }
          />

          <Route path='/movies' element={
            <>
              <Header loggedIn={true} />
              <Movies loggedIn={loggedIn} />
              <Footer />
            </>
            }
          />

          <Route path='/saved-movies' element={
            <>
              <Header loggedIn={true} />
              <SavedMovies loggedIn={loggedIn} />
              <Footer />
            </>
            }
          />

          <Route path='/profile' element={
            <>
              <Header loggedIn={true}/>
              <Profile loggedIn={loggedIn} />
            </>
            }
          />

          <Route path='/signup' element={<Register />}></Route>
          <Route path='/signin' element={<Login />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}
