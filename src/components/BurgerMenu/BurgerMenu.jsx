import './BurgerMenu.css';
import { Link, useLocation } from 'react-router-dom';

export default function BurgerMenu({ onClose, loggedIn, onOverlayClick }) {
  const location = useLocation();

  return (
    <section className={ loggedIn ? 'burger' : 'burger burger_hide'} onClick={onOverlayClick} >
      <div className='burger__blur'>

        <div className='burger__content'>
          <button
            className='burger__close-btn button'
            type='button'
            aria-label='закрыть меню'
            onClick={() => onClose()}
          />
        
          <div className='burger__list'>
            <Link to='/'
              className={location.pathname === '/' ? 'burger__link burger__link_active' : 'burger__link'}
              onClick={() => onClose()}>
                Главная
            </Link>
            <Link to='/movies'
              className={location.pathname === '/movies' ? 'burger__link burger__link_active' : 'burger__link'}
              onClick={() => onClose()}>
                Фильмы
            </Link>
            <Link to='/saved-movies'
              className={location.pathname === '/saved-movies' ? 'burger__link burger__link_active' : 'burger__link'}
              onClick={() => onClose()}>
                Сохранённые фильмы
            </Link>
          </div>

          <Link to='/profile' className='burger__account-link link'>Аккаунт</Link>
        </div>
      </div>
    </section>
  )
}
