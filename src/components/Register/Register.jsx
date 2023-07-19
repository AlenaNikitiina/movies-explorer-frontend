import './Register.css';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Register({ handleRegister, renderLoading }) {
  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const resetFormCallBack = () => {
      resetForm();
    };

    handleRegister(
      values.name,
      values.email,
      values.password,
      resetFormCallBack
    );
  }

  return(
    <PopupWithForm
      name='register'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      link='/signin'
      question='Уже зарегистрированы?'
      renderLoading={renderLoading}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      linkText={renderLoading ? `Регистрация...` : `Войти`}
    >
      <section className='register'>
        <label className='register__label' htmlFor='name'>Имя
          <input
            className='register__input'
            type='text'
            name='name'
            id='name'
            placeholder="Имя"
            required
            minLength={2}
            maxLength={30}
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className='register__error name-error' id='name-error'>{errors.name}</span>
        </label>

        <label className='register__label' htmlFor='email'>E-mail
          <input
            className='register__input'
            type="email"
            name='email'
            id='email'
            placeholder="Электронная почта"
            required
            minLength={5}
            maxLength={40}
            //pattern='^[-a-z0-9!#$%&*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&*+/=?^_`{|}~]+)*@(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)+[a-z0-9]{2,4}?$'
            pattern='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className='register__error email-error' id='email-error'>{errors.email}</span>
        </label>
        
        <label className='register__label' htmlFor='password'>Пароль
          <input
            className='register__input'
            type='password'
            name='password'
            id='password'
            placeholder="Пароль"
            required
            minLength={2}
            maxLength={30}
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='register__error password-error' id='password-error'>{errors.password}</span>
        </label>
        {renderLoading ? <Preloader /> : ''}
      </section>
    </PopupWithForm>
  )
}

  /*
    //const  [email, setEmail] = useState();
  //const  [ errorMessageName, setErrorMessageName] = useState();
 
  const nameHandler = (evt) => {
    setEmail(evt.target.value)
    const pattern = /^[A-Za-zА-Яа-яЁё /s -]{4,}/ 
    if (!pattern.test(String(evt.target.value).toLocaleLowerCase())) {
       setErrorMessageName("Неккоректное имя") 
      } else { setErrorMessageName("") } 
  }

  onChange={e => nameHandler(e)}
  */
