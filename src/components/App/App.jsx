import { React, useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppMessage } from '../../utils/constants';

export default function App() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({}); // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка. Loader
  const [isInfoTooltip, setIsInfoTooltip] = useState(false); // popup Информационная подсказка
  const [registrationForm, setRegistrationForm] = useState({ status: false, text: "" }); // текст для Информ подсказки
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Регистрация, в компоненте Register и как прошла ?
  const handleRegister = (name, email, password, resetFormCallBack) => {
    setRenderLoading(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltip(true); // popup Информационная подсказка
          setRegistrationForm({
            status: true,
            text: AppMessage.SUCCESS,
          });
          resetFormCallBack(); // сброс полей формы
          handleLogin(email, password, resetFormCallBack);
          navigate('/movies', {replace : true} );
          // потом подсказки исчезнут
          setTimeout(() => {
            setIsInfoTooltip(false);
            setRenderLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err)
        setRegistrationForm({
          status: false,
          text: AppMessage.UNSUCCESS,
        });
        setIsInfoTooltip(true);
        // потом подсказки исчезнут
        setTimeout(() => {
          setIsInfoTooltip(false);
          setRenderLoading(false);
        }, 2000);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  // Авторизация, в компоненте Login
  const handleLogin = (email, password, resetFormCallBack) => {
    setRenderLoading(true);
    mainApi.login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token); // если ок то добавь в localStorage
        mainApi.setAuthToken(data.token);
        resetFormCallBack();
        setLoggedIn(true); // залогинь
        navigate('/movies', {replace : true} );
        setTimeout(() => {
          setIsInfoTooltip(false);
          setRenderLoading(false);
        }, 2000);
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: AppMessage.UNSUCCESS,
        })
        setIsInfoTooltip(true);
        // потом подсказки исчезнут
        setTimeout(() => {
          setIsInfoTooltip(false);
          setRenderLoading(false);
        }, 2000);
      })
      .finally(() => setRenderLoading(false));
  };

  //
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log (err);
      })
      .finally(() => { console.log("loggedIn::finally") });
    }
  }, [loggedIn] ); // ток один раз при первом рендеринге
  // или написать loggedIn

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // Проверка токена. если есть токен в localStorage,то проверим валидность токена
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(AppMessage.TOKEN_ERR, err);
          signOut();
        });
    } else
      setLoggedIn(false);
  }, [navigate]);


  // Кнопка выйти из профиля / разлогиниться
  function signOut() {
    setLoggedIn(false); // разлогинить
    setCurrentUser({}); //
    setSavedMovies([]); // сохранен фильмы пустые
    navigate('/');
    mainApi.setAuthToken('');
    localStorage.clear(); // все удалить из локального хранилища
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
                onSignOut={signOut}
                onOverlayClick={handleOverlayClick}
                setIsInfoTooltip={setIsInfoTooltip}
                setRegistrationForm={setRegistrationForm}
              />
            </ProtectedRoute>
            }
          />

          <Route path='/signup' element={
            loggedIn ?
              <Navigate to='/movies' />
              :
              <Register
                renderLoading={renderLoading}
                handleRegister={handleRegister}
              />
            }
          />

          <Route path='/signin' element={
            loggedIn ?
              <Navigate to='/movies' />
              :
              <Login
                handleLogin={handleLogin}
                renderLoading={renderLoading}
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
