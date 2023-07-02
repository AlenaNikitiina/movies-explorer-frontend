import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hook/useFormWithValidation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function SearchForm({handleSubmitSearch, handleChangeCheckbox}) {
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
    //console.log('handleFormSubmit', values['search-input']);
    handleSubmitSearch(values['search-input']);
  }

  useEffect(() => {
    if (pathname === '/movies') {
      console.log("setValues", setValues);
      const storageKeyWord = localStorage.getItem('storageKeyWord');
      storageKeyWord && setValues({keyWord: storageKeyWord});
      setIsFormValid(true);
    } else {
      setValues({keyWord: ''});
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