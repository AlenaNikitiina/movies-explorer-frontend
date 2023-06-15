import './FilterCheckbox.css';

export  default function FilterCheckbox() {

  const handleСheck = () => {
    console.log('switch Checkbox');
  }

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__content'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          /*checked={isСheck}*/
          onChange={handleСheck}
        />
        <span className='filter-checkbox__switch'/>
        <span className='filter-checkbox__text'>Короткометражки</span>
      </label>
    </div>
  )
}
