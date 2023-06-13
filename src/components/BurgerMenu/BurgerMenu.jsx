import './BurgerMenu.css';
import { Link, useLocation } from 'react-router-dom';

export default function BurgerMenu({ onClose, loggedIn }) {
  const location = useLocation();

  return (
    <div className={ loggedIn ? 'burger' : 'burger_hide' }>
      <div className='burger__blur'>

        <div className='burger__content'>
          <button
            className='burger-close'
            type='button'
            aria-label='закрыть меню'
            onClick={() => onClose()}
          >
          
          </button>
          <span className='burger__line' />
        
          <div className='burger__list'>
            <Link to='/' className={location.pathname === '/'                         ? 'burger__link_active' : 'burger__link'}>Главная</Link>
            <Link to='/movies' className={location.pathname === '/movies'             ? 'burger__link_active' : 'burger__link'}>Фильмы</Link>
            <Link to='/saved-movies' className={location.pathname === '/saved-movies' ? 'burger__link_active' : 'burger__link'}>Сохранённые фильмы</Link>
          </div>

          <Link to='/profile'>
            <button className='burger__account-btn'>Аккаунт</button>
          </Link>
        </div>
      </div>

    </div>
  )
}
