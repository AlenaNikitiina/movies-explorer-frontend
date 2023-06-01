import './Promo.css';
import landing_logo from '../../images/landing_logo.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__pharagraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__button">Узнать больше</button>
        </div>
        <img className='promo__img' src={landing_logo} alt="ni" />
      </div>
    </section>
  )

}