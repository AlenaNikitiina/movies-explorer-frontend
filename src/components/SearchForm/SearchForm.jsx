import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log('handleFormSubmit');
  }

  const handleChange = () => {
    console.log('Change input');
  }

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
        <FilterCheckbox />
      </div>
    </section>
  )
}