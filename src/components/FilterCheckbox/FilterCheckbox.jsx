import './FilterCheckbox.css';

export  default function FilterCheckbox({ isShort }) {

  const setIsShot = (evt) => {
    console.log('check')
  }

  return (
    <div className='checkbox'>
      <label className='checkbox__content'>
        <input
          className='checkbox__input'
          onClick={() => setIsShot(!isShort)}
          type='checkbox'
          checked={isShort}
        />
        <span className='checkbox__switch'/>
        <span className='checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
}

/*
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
*/