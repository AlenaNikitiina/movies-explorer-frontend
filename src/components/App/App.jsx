import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

import mainApi from '../../utils/MainApi';
import getContent from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser]     = useState({}) // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка
  const [isInfoTooltip, setIsInfoTooltip] = useState(false); // popup Информационная подсказка
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({ status: false, text: "" });
  
/*
  // обработчик изменения данных пользователя. имя, почта. from Profile
  function handleUpdateUser(name, email) {
    setRenderLoading(true);
    mainApi
      .editingProfile(name, email)
      .then ((newUserData) => {
        console.log('dfddf');
        setCurrentUser(newUserData); // обновили
        //closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось изменить данные: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  };*/


  // обработчик изменения данных пользователя. имя, почта. from Profile
  function handleUpdateUser(name, email) {
    setRenderLoading(true);
    mainApi
      .editingProfile(name, email)
      .then ((newUserData) => {
        console.log('dfddf');
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





    // авторизация, в компоненте Login
    function handleLogin(email, password) {
      setRenderLoading(true);
      mainApi.login(email, password)
        .then((data) => {
          console.log('handleLogin')
          localStorage.setItem("jwt", data.token); // если ок то добавь в localStorage
          //api.setAuthToken(data.token);
          setLoggedIn(true); 
          navigate("/movies", {replace : true} )
        })
        .catch(() => {
          setRegistrationForm({
            status: false,
            text: 'Что-то пошло не так!',
          })
          setIsInfoTooltip(true);
        })
        .finally(() => setRenderLoading(false));
  };

  // регистрация, в компоненте Register и как прошла ?
  function handleRegister( name, email, password ) {
    console.log('handelRegistration app');
    setRenderLoading(true);
    mainApi.register(name, email, password)
      .then((res) => {
        console.log('handelRegistration then')
        if (res) {
          setRegistrationForm({
            status: true,
            text: 'Вы успешно зарегистрировались!',
          })
          setIsInfoTooltip(true);
          handleLogin(email, password)
        }
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltip(true);
      })
      .finally(() => setRenderLoading(false));
  };


  // проверка токена. если есть токен в localStorage,то проверим валидность токена
  const checkToken = () => {

    // console.log("checkToken Nahuy")
    // jwt это наш токен 
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true); // авторизуем пользователя
          // checkToken заодно выдаёт информацию о на шем пользователе - сохраним её
          setCurrentUser(res);
          navigate("/", {replace: true}) // перенаправьте
        }
      })
      .catch((err) => {
        console.log('Неверный токен.', err);
      })
    }
  };


    //
    useEffect(() => {
      checkToken();
    }, [] ); // ток один раз при первом рендеринге
    // или написать loggedIn

    // кнопка выйти из профиля / разлогиниться
  function signOut() {
    console.log('signOut')
    localStorage.removeItem('jwt'); // удалить
    setLoggedIn(false); // разлогинить
    //setM
    navigate('/');
  };

  //клик на оверлэй, вне формы
  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
      
    }
  };

  function closeAllPopups () {
    setIsInfoTooltip (false);
    //set (false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/sign-up' element={<Header />}></Route>

          <Route path='/' element={
            <>
              <Header loggedIn={loggedIn} onOverlayClick={handleOverlayClick}/>
              <Main loggedIn={loggedIn}/>
              <Footer />
            </>
            }
          />

          <Route path='/movies' element={
            <>
              <Header loggedIn={true} onOverlayClick={handleOverlayClick}/>
              <Movies loggedIn={loggedIn} onOverlayClick={handleOverlayClick}/>
              <Footer />
            </>
            }
          />

          <Route path='/saved-movies' element={
            <>
              <Header loggedIn={loggedIn} onOverlayClick={handleOverlayClick}/>
              <SavedMovies loggedIn={loggedIn} />
              <Footer />
            </>
            }
          />

          <Route path='/profile' element={
            <>
              <Header onOverlayClick={handleOverlayClick}/>
              <Profile
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                renderLoading={renderLoading}
                onSignOut={signOut}
              />
            </> }
          />

          <Route path='/signup' element={
            loggedIn ?
            <Navigate to='/movies' />
              :
              <Register
                handleRegister={handleRegister}
                registrationForm={registrationForm}
                renderLoading={renderLoading}
              />
            }
          />
    
          <Route path='/signin' element={
            loggedIn ?
            <Navigate to='/movies' />
              :
            <Login
              handleLogin={handleLogin}
              registrationForm={registrationForm}
              renderLoading={renderLoading}/>
            }
          />
        
          <Route path='*' element={<NotFound />} />
        </Routes>
    
        <InfoTooltip
          isOpen={isInfoTooltip}
          //onClose={closeAllPopups}
          //setIsInfoTooltip={setIsInfoTooltip}
          registrationForm={registrationForm}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}


/*
            <Route path='/signup' element={
              loggedIn ?
              <Navigate to='/movies' />
                :
                <Register
                  handelRegistration={handelRegistration}
                  registrationForm={registrationForm}
                />}>
            </Route>


            
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header />
              <Profile
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                renderLoading={renderLoading}
              />
            </ProtectedRoute> 
            }
          />
            */


