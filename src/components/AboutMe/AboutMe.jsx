import './AboutMe.css';

export default function AboutMe() {
  return(
    <section className='about-me'>
      <div className='about-me__content'>
        <h2 className='about-me__title title'>Студент</h2>
        <div className='about-me__w'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>Алёна</h3>
            <p className='about-me__profession'>Full-stack разработчик, 30 лет</p>
            <p className='about-me__text'>Я родилась в Московской области. Закончила Первый Московский государственный медицинский университет им. И. М. Сеченова и несколько лет работала врачом анестезиологом-реаниматологом. После решила эммигрировать и поняла, что мне нужна профессия, в которой я не буду привязанной к месту. Начинала проходить бесплатные курсы еще два года назад, а сейчас решилась на большой курс. Люблю урбанистику и велосипед.</p>
            <a className='about-me__link link' href='https://github.com/AlenaNikitiina' target='blank' >Github</a>
          </div>
          <img className='about-me__photo' src='https://images.unsplash.com/photo-1571840077260-acb8f80e30cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' alt='мое фото' />
        </div>
      </div>
    </section>
  )
}