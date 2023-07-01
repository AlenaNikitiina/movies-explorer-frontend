import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hook/useFormWithValidation';

export default function SearchForm({handleSubmitSearch, handleChangeCheckbox}) {

  const {
    values,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = useFormWithValidation();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log('handleFormSubmit', values['search-input']);
    handleSubmitSearch(values['search-input']);
  }

  /*
  const handleChange = () => {
    console.log('Change input');
  }
  */

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