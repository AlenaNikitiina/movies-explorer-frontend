import { Link } from "react-router-dom";
import './PopupWithForm.css';
import logo from '../../images/logo.svg';

export default function PopupWithForm ({ name, title, children, buttonText, linkText, question, link }) {
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log('handleFormSubmit');
  }

  return (
    <section className='popup'>
      <div className='popup__wrapper'>
        <Link to='/' className='header__logo popup__logo'>
          <img src={logo} alt='Лого проекта' />
        </Link>
        <h1 className='popup__title'>{`${title}`}</h1>
      </div>

      <form
        className='popup__form'
        name={`popup_${name}`}
        action=''
        onSubmit={handleFormSubmit}
        >
        {children}
        <button className='popup__button button' type='submit'>{buttonText}</button>
      </form>

      <p className='popup__question'>{question}&nbsp;
        <Link to={`${link}`} className='popup__link link'>{linkText}</Link>
      </p>
    </section>
  )
}
