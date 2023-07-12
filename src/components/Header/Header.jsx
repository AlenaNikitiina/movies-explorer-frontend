import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

export default function Header({ loggedIn, onOverlayClick }) {
  const { pathname } = useLocation();
  const location = useLocation();

  return (
    <header className={ location.pathname === '/' ? 'header header__content-p' : 'header_white'} onClick={onOverlayClick}>
      <div className={ location.pathname === '/' ? 'header__content header__content-pink' : 'header__content'}>
      
        <Link to="/" className='header__logo'>
          <img alt='Лого проекта' src={logo} />
        </Link>
      
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  )
}
//className={ loggedIn ? 'header_white' : 'header' }