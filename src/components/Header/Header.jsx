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
