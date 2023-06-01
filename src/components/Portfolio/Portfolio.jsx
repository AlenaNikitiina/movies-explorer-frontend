import './Portfolio.css';

export default function Portfolio() {
  return(
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li>
          <a className='portfolio__item link' href='https://github.com/AlenaNikitiina/how-to-learn' target='blank'>
            Статичный сайт<span className='portfolio__arrow'>↗</span></a>
        </li>
        <li>
          <a className='portfolio__item link' href='https://alenanikitiina.github.io/russian-travel/' target='blank'>
            Адаптивный сайт<span className='portfolio__arrow'>↗</span></a>
        </li>
        <li>
          <a className='portfolio__item link' href='https://alenanikitiina.github.io/russian-travel/' target='blank'>
            Одностраничное приложение<span className='portfolio__arrow'>↗</span></a>
        </li>
        <li></li>
    </ul>
  </section>
  )
}