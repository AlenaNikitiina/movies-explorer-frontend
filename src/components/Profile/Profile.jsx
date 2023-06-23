import './Profile.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Profile({ onUpdateUser, renderLoading, onSignOut, onOverlayClick }) {
  //console.log("fff ", CurrentUserContext)
  const currentUser = useContext(CurrentUserContext);

  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

  
  const handleSubmit = (evt) => {
    console.log('handleSubmit');
    evt.preventDefault();
    //onUpdateUser(values);
    onUpdateUser(
     values.name,
     values.email,
    );
    //resetForm();
  }

  const handleEditButton = (evt) => {
    console.log('handleEditButton');
    evt.preventDefault();
    //onUpdateUser(values);
    /*
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
    */
    onUpdateUser(
      values.name,
      values.email
    );
    //resetForm();
  }

  ////////

  /*
  function f () {
    console.log('ff function');
    console.log('currentUser', currentUser.name, currentUser.email);
    console.log('values', values.name, values.email);
  }
  */
  //f ();

  //
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  },[currentUser, resetForm] )

  return(
    <section className='profile' onClick={onOverlayClick}>
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form
        className='profile__form'
        onSubmit={handleSubmit}
        renderLoading={renderLoading}
        isFormValid={isFormValid}
      >
        <div className='profile__cell'>
          <label className='profile__label' htmlFor='name'>Имя</label>
          <input
            className='profile__input'
            type='text'
            id='name'
            required
            minLength={2}
            maxLength={30}
            placeholder='Имя'
            name='name'
            //pattern='[a-zA-Za-яА-Я -]{2,30}'
            value={values.name || ''}
            onChange={handleChange}
            //renderLoading={renderLoading}
          />
        </div>
        <span className='profile__error name-error' id='name-error'>{errors.name}</span>

        <div className='profile__cell'>
          <label className='profile__label' htmlFor='email'>E-mail</label>
          <input
            className='profile__input'
            type='email'
            id='email'
            required
            minLength={4}
            maxLength={40}
            //pattern='^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$'
            placeholder='pochta@yandex.ru'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            //renderLoading={renderLoading}
          />
        </div>
        <span className='profile__error email-error' id='email-error'>{errors.email}</span>
  
        <button
          className='profile__edit-button button'
          type='button'
          //disabled={!isFormValid}
          onClick={handleEditButton}
            >Редактировать
        </button>
        <Link to='/' className='profile__link link' onClick={onSignOut}>Выйти из аккаунта</Link>
      </form>
    </section>
  )
}
