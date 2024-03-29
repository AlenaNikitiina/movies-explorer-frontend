import './Portfolio.css';

export default function Portfolio() {
  return(
    <section className='portfolio'>
      <div className='portfolio__content'>
        <h4 className='portfolio__title'>Портфолио</h4>
        <ul className='portfolio__list'>
          <li>
            <a className='portfolio__item link' href='https://alenanikitiina.github.io/how-to-learn/index.html' target='blank'>
              Статичный сайт
              <span className='portfolio__span'>↗</span></a>
          </li>
          <li>
            <a className='portfolio__item link' href='https://alenanikitiina.github.io/russian-travel/' target='blank'>
              Адаптивный сайт
              <span className='portfolio__span'>↗</span></a>
          </li>
          <li>
            <a className='portfolio__item link' href='https://nikitina.nomoredomains.monster' target='blank'>
              Одностраничное приложение
              <span className='portfolio__span'>↗</span></a>
          </li>
      </ul>
      </div>
    </section>
  )
}
