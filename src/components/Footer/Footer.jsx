import './Footer.css';

export default function Footer() {
  return (
    <section className='footer'>
      <p className='footer__sign'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__text'>
        <p className='footer__copyright'>&copy; 2020</p>
        <ul className='footer__list'>
          <li>
            <a className='footer__link' href='https://practicum.yandex.ru' target='blank'>Яндекс.Практикум</a>
          </li>
          <li>
            <a className='footer__link' href='https://github.com/AlenaNikitiina' target='blank'>Github</a>
          </li>
        </ul>
      </div>
    </section>

  )
}