import './FilterCheckbox.css';
import { useState } from 'react';

export  default function FilterCheckbox({handleCheckbox}) {

  const [isChecked, setIsChecked] = useState(false);

  function handleSwitch() {
    console.log('switch Checkbox');
    setIsChecked(!isChecked);
    // берём инвертированное состояние isChecked, т.к. setIsChecked асинхронный
    // и там будет некорректное значение
    handleCheckbox(!isChecked);
  }

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          onChange={handleSwitch}
        />
        <span className='filter-checkbox__switch'/>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
}
