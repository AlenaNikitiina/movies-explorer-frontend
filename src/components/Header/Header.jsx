import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({ loggedIn }) {
  return (
    <section className={ loggedIn ? 'header_white' : 'header' } >
      <div className='header__content'>
      
        <Link to="/" className='header__logo'>
          <img alt='Лого проекта' src={logo} />
        </Link>
      
        <Navigation loggedIn={loggedIn} />
      </div>
    </section>
  )
}


/*
export default function Header() {
  return (
    <section className='header'>
      <div className='header__content'>
        <a className='header__logo' href='/'>
          <img alt='Лого проекта' src={logo}/>
        </a>

        <ul className='nav-tab'>
          <li>
            <a className='nav-tab__item link' href='/signup'>Регистрация</a>
          </li>
          <li>
            <a className='nav-tab__item link' href='/signin'>Войти</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

*/