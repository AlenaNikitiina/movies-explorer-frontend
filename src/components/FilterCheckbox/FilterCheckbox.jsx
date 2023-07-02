import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function FilterCheckbox({ handleCheckbox }) {
  const { pathname } = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  function handleSwitch() {
    console.log('switch Checkbox');
    setIsChecked(!isChecked);
    // берём инвертированное состояние isChecked, т.к. setIsChecked асинхронный
    // и там будет некорректное значение
    handleCheckbox(!isChecked);
  }

  useEffect(() => {
    if (pathname === '/movies') {
      const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort'));
      storageIsShort && setIsChecked(storageIsShort);
    } else {
      setIsChecked(false);
    }
  }, []);

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          checked={isChecked}
          onChange={handleSwitch}
        />
        <span className='filter-checkbox__switch'/>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
}
