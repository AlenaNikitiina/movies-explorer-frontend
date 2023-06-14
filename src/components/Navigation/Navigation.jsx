import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu'; //

export default function Navigation({ loggedIn }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const location = useLocation();

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav className='navigation'>
      { loggedIn
      ? (
        <>
          <div className={ location.pathname === '/'                                   ? 'navigation__content' : 'navigation__content'}>
            <Link to='/movies' className={ location.pathname === '/movies'             ? 'navigation__link_active link' : 'navigation__link link'}>Фильмы</Link>
            <Link to='/saved-movies' className={ location.pathname === '/saved-movies' ? 'navigation__link_active link' : 'navigation__link link'}>Сохраненные фильмы</Link>

            <Link to='/profile'>
              <button className='navigation__account-btn'>Аккаунт</button>
            </Link>
          </div>
        </>

      ) : (
        <div className='nav-tab'>
          <Link to='/signup' className='nav-tab__item link'>Регистрация</Link>
          <Link to='/signin' className='nav-tab__item_active'>Войти</Link>
        </div>
      )}

      { loggedIn && !isBurgerOpen
      ? (
        <button className='navigation__burger-btn button' onClick={toggleBurger} />
      ) : (
        <BurgerMenu onClose={toggleBurger} loggedIn={loggedIn} />
      )}
    
    </nav>
  )
}

  //const [d, setD] = useState(false); // for nav-tab__item_active
  // className={ d ? 'nav-tab__item_active' : 'nav-tab__item link' }