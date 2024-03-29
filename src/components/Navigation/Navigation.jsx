import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu'; //

export default function Navigation({ loggedIn, onOverlayClick }) {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav className='navigation' onClick={onOverlayClick}>
      { loggedIn
      ? (
        <>
          <div className={ location.pathname === '/' ? 'navigation__content' : 'navigation__content'}>
          
            <Link to='/movies'
              className={ location.pathname === '/movies'
              ? 'navigation__link_active link'
              : 'navigation__link link'}
            >Фильмы
            </Link>
          
            <Link to='/saved-movies'
              className={ location.pathname === '/saved-movies'
              ? 'navigation__link_active link'
              : 'navigation__link link'}
            >Сохраненные фильмы
            </Link>

            <Link to='/profile' className='navigation__account-link link'>Аккаунт</Link>
          </div>
        </>

      ) : (
        <div className='navigation__auth'>
          <Link to='/signup' className='navigation__auth-item link'>Регистрация</Link>
          <Link to='/signin' className='navigation__auth-item navigation__auth-item_active'>Войти</Link>
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
