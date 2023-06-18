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
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser]     = useState({}) // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка
  const [isInfoTooltip, setIsInfoTooltip] = useState(false); // popup
  //const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({ status: false, text: "" });
  


  // обработчик изменения данных пользователя. имя, почта. from Profile
  function handleUpdateUser(name, about) {
    setRenderLoading(true);
    mainApi.editingProfile(name, about)
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


    // авторизация, в компоненте логин
    function handleLogin( {email, password} ) {
      setRenderLoading(true);
      mainApi
      .authorize(email, password)
        .then((data) => {
          console.log('handleLogin')
          localStorage.setItem("jwt", data.token); // если ок то добавь в localStorage
          //api.setAuthToken(data.token);
          setLoggedIn(true); 
          //navigate("/", {replace : true} )
        registrationForm({
          status: true,
          text: 'Вы успешно зарегистрировались!',
        });
        setIsInfoTooltip(true);
        })
        .catch(() => {
          setIsInfoTooltip(true)
          setRegistrationForm({
            status: false,
            text: 'Что-то пошло не так!',
          })
        })
  };

  //2
  // регистрация, в компоненте Registr + как прошла ?
  function handelRegistration({ name, email, password }) {
    setRenderLoading(true);
    mainApi
    .register(name, email, password)
      .then((res) => {
        console.log('handelRegistration')
        handleLogin(email, password)
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltip(true)
      })
      .finally(() =>  setRenderLoading(false));
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

            <Route path='/signup' element={
              <Register
                handelRegistration={handelRegistration}
                registrationForm={registrationForm}
              />}></Route>
            
            <Route path='/signin' element={<Login />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltip}
            //onClose={closeAllPopups}
            setIsInfoTooltip={setIsInfoTooltip}
            registrationForm={registrationForm}
          />
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  )
}
