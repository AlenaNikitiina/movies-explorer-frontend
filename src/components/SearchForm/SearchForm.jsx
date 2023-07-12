import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hook/useFormWithValidation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Message } from '../../utils/constants';

export default function SearchForm({handleSubmitSearch, handleChangeCheckbox, showError }) {
  const { pathname } = useLocation();
  const {
    values,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = useFormWithValidation();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
   // handleSubmitSearch(values['search-input']);
   isFormValid ? handleSubmitSearch(values['search-input']) : showError(Message.NOT_FOUND);
  }

  useEffect(() => {
    if (pathname === '/movies') {
      const storageKeyWord = localStorage.getItem('storageKeyWord');
      storageKeyWord && setValues({'search-input': storageKeyWord});
      setIsFormValid(true);
    } else {
      setValues({'search-input': ''});
    }
  }, [pathname]);

  return(
    <section className='search-form'>
      <div className='search-form__content'>
        <form
          className='search-form__form'
          name='search-form'
          onSubmit={handleFormSubmit}>
            <input
              className='search-form__input'
              name='search-input'
              type='text'
              placeholder='Фильм'
              value={values['search-input'] || ''}
              required
              onChange={handleChange}
            />
          <button className='search-form__button button' type='submit'>Найти</button>
        </form>
        <FilterCheckbox handleCheckbox={handleChangeCheckbox}/>
      </div>
    </section>
  )
}