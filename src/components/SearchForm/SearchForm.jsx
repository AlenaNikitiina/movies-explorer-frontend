import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

export default function SearchForm() {
  const [isСheck, setIsСheck] = useState(false);

  return(
    <section className='search-form'>
      <div className='search-form__content'>
        <form className='search-form__form' name='search-form'>
          <input
            className='search-form__input'
            name='search-input'
            type='text'
            placeholder='Фильм'
            required
          />
          <button className='search-form__button button' type='submit'>Найти</button>
        </form>
        
        <FilterCheckbox isСheck={isСheck} setIsСheck={setIsСheck} />
      </div>
    </section>
  )
}