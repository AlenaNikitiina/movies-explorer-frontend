import './AboutMe.css';

export default function AboutMe() {
  return(
    <section className='about-me'>
      <div className='about-me__content'>
        <h2 className='section__title'>Студент</h2>
        <div className='about-me__w'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>Алёна</h3>
            <p className='about-me__profession'>Full-stack разработчик, 30 лет</p>
            <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена  дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className='about-me__link link' href='https://github.com/AlenaNikitiina' target='blank' >Github</a>
          </div>
          <img className='about-me__photo' src='https://images.unsplash.com/photo-1571840077260-acb8f80e30cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' alt='мое фото' />
        </div>
      </div>
    </section>
  )
}