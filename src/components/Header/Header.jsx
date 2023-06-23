import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

//<header className={ loggedIn ? 'header_white' : 'header' } >
export default function Header({ loggedIn, onOverlayClick }) {
  return (
    <header className='header' onClick={onOverlayClick} >
      <div className='header__content'>
      
        <Link to="/" className='header__logo'>
          <img alt='Лого проекта' src={logo} />
        </Link>
      
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  )
}
