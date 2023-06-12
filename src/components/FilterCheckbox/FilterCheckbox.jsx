import './FilterCheckbox.css';

export default function FilterCheckbox({ isСheck, setIsСheck }) {
  return(
    <section className='checkbox'>
      <div className='checkbox__content'>
        <input
          className='checkbox__input'
          type='checkbox'
          checked={isСheck}
          onClick={() => setIsСheck(!isСheck)}
        />
      
        <span className='checkbox__switch' />
        <span className='checkbox__text'>Короткометражки</span>
      </div>
    </section>
  )
}