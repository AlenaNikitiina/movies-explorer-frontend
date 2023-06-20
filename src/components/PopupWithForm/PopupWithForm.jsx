import { Link } from "react-router-dom";
import './PopupWithForm.css';
import logo from '../../images/logo.svg';

export default function PopupWithForm ({ onSubmit, isFormValid, name, title, children, buttonText, linkText, question, link }) {

  return (
    <section className='popup'>
      <div className='popup__wrapper'>
        <Link to='/' className='popup__logo'>
          <img src={logo} alt='Лого проекта' />
        </Link>
        <h1 className='popup__title'>{`${title}`}</h1>
      </div>

      <form
        className='popup__form'
        name={`popup_${name}`}
        action=''
        noValidate
        onSubmit={onSubmit}
        >
        {children}
      
        <button
          className='popup__button button'
          type='submit'
          disabled={!isFormValid}
          >{buttonText}</button>
      </form>

      <p className='popup__question'>{question}&nbsp;
        <Link to={`${link}`} className='popup__link link'>{linkText}</Link>
      </p>
    </section>
  )
}
