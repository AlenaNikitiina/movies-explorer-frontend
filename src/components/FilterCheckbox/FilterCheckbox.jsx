import './FilterCheckbox.css';

export  default function FilterCheckbox() {

  function handleSwitch() {
    console.log('switch Checkbox');
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
