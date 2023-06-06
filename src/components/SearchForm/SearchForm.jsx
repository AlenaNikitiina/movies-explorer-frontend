import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return(
    <section className='search-form'>
      <div className='search-form__content'>
        <form className='search-form__form' name='search-form'>
          <input className='search-form__input' name='search-input' type='text' placeholder='Фильм' />
          <button className='search-form__button' type='submit'>Найти</button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  )
}