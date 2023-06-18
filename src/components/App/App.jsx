import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/MainApi';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser]     = useState({}) // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка
  //const navigate = useNavigate();


  // обработчик изменения данных пользователя. имя, почта. from Profile
  function handleUpdateUser(name, about) {
    setRenderLoading(true);
    api.editingProfile(name, about)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
        //closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось изменить данные: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  };

  /*
  // кнопка выйти из профиля / разлогиниться
  function signOut() {
    localStorage.removeItem('jwt'); // удалить
    setLoggedIn(false); // разлогинить
    navigate('/');
  };
*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  renderLoading={renderLoading}
                  
                />
              </>
              }
            />

            <Route path='/signup' element={<Register />}></Route>
            <Route path='/signin' element={<Login />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          
          </Routes>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  )
}
