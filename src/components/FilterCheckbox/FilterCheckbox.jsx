import './FilterCheckbox.css';
import { useState } from 'react';

export default function FilterCheckbox({ isСheck, setIsСheck }) {

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(true);
    console.log('check');
  };

  return(
    <section className='checkbox'>
      <div className='checkbox__content'>
        <input
          className='checkbox__input'
          type='checkbox'
          checked={isChecked}
          onChange={handleChange}
        />
      
        <span className='checkbox__switch' />
        <span className='checkbox__text'>Короткометражки</span>
      </div>
    </section>
  )
}