import './Header.css';
import logo from '../../images/logo.svg';

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
//link make