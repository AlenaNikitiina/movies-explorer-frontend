import { React, useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import mainApi from '../../utils/MainApi';
//import MoviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppMessage } from '../../utils/constants';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка. Loader
  const [isInfoTooltip, setIsInfoTooltip] = useState(false); // popup Информационная подсказка
  const [registrationForm, setRegistrationForm] = useState({ status: false, text: "" }); // текст для Информ подсказки
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  // Регистрация, в компоненте Register и как прошла ?
  function handleRegister( name, email, password ) {
    setRenderLoading(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setRegistrationForm({
            status: true,
            text: AppMessage.SUCCESS,
          })
          setIsInfoTooltip(true);
          handleLogin(email, password);
          navigate('/movies');
        }
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: AppMessage.UNSUCCESS,
        });
        setIsInfoTooltip(true);
      })
      .finally(() => setRenderLoading(false));
  };

  // Авторизация, в компоненте Login
  function handleLogin(email, password) {
    setRenderLoading(true);
    mainApi.login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token); // если ок то добавь в localStorage
        setLoggedIn(true); // залогинь
        navigate('/movies', {replace : true} );
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: AppMessage.UNSUCCESS,
        })
        setIsInfoTooltip(true);
      })
      .finally(() => setRenderLoading(false));
  };

  // Обработчик изменения данных пользователя. имя, почта.В компоненте Profile
  function handleUpdateUser(name, email) {
    setRenderLoading(true);
    mainApi
      .editingProfile(name, email)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
          closeAllPopups();
        })
      .catch(err => {
        console.log(AppMessage.UPDATE_ERR, err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
    };
    
    //console.log('currentUser:', currentUser)

  // Проверка токена. если есть токен в localStorage,то проверим валидность токена
//  const checkToken = () => {
  function checkToken() {
    // jwt это наш токен 
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          //console.log("checkToken res", res)
          setLoggedIn(true); // авторизуем пользователя
          // checkToken заодно выдаёт информацию о нашем пользователе - сохраним её
          //console.log("checkToken res", res)
          setCurrentUser(res);
          //console.log("checkToken currentUser", currentUser);
          mainApi.setAuthToken(jwt);
          navigate("/", {replace: true}) // перенаправьте
        }
      })
      .catch((err) => {
        console.log(AppMessage.TOKEN_ERR, err);
      })
    }
  };

  //
  useEffect(() => {
    checkToken();
      if (loggedIn) {
        mainApi.getSavedMovies()
        .then((res) => {
          //console.log("getSavedMovies", res);
          setSavedMovies(res);
        })
        .catch((err) => {
        })
      }
  }, [loggedIn] ); // ток один раз при первом рендеринге
  // или написать loggedIn

  // Кнопка выйти из профиля / разлогиниться
  function signOut() {
    console.log('signOut');
    localStorage.removeItem('jwt'); // удалить
    setLoggedIn(false); // разлогинить
    setCurrentUser({}); //
    setSavedMovies([]); // сохранен фильмы пустые
    navigate('/');
  };

  // Клик на оверлэй, вне формы
  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function closeAllPopups () {
    setIsInfoTooltip (false);
    setRenderLoading(false);
    //burger
  };

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, savedMovies, setSavedMovies}}>
      <div className='app'>
        <Routes>
          <Route path='/' element={
            <>
              <Header loggedIn={loggedIn} onOverlayClick={handleOverlayClick}/>
              <Main />
              <Footer />
            </>
            }
          />

          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                onOverlayClick={handleOverlayClick}
              />
              <Movies renderLoading={renderLoading}/>
              <Footer />
            </ProtectedRoute>
            }
          />

          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                onOverlayClick={handleOverlayClick}
              />
              <SavedMovies renderLoading={renderLoading}/>
              <Footer />
            </ProtectedRoute >
            }
          />

          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                onOverlayClick={handleOverlayClick}
              />
              <Profile
                onUpdateUser={handleUpdateUser}
                onSignOut={signOut}
                registrationForm={registrationForm}
                onOverlayClick={handleOverlayClick}
              />
            </ProtectedRoute>
            }
          />

          <Route path='/signup' element={
            loggedIn ?
              <Navigate to='/movies' />
              :
              <Register
                handleRegister={handleRegister}
                registrationForm={registrationForm}
                onOverlayClick={handleOverlayClick}
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
                onOverlayClick={handleOverlayClick}
              />
            }
          />
        
          <Route path='*' element={<NotFound />} />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          registrationForm={registrationForm}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}
