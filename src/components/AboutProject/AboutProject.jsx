import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <div className='about-project__content'>
        <h2 className='about-project__title title'>О проекте</h2>
        <div className='about-project__description'>
          <div>
            <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__pharagraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div>
            <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__pharagraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
      </div>
        <div className="about-project__time">
          <p className='about-project__back about-project__time-text'>1 неделя</p>
          <p className='about-project__front about-project__time-text'>4 недели</p>
          <p className='about-project__back about-project__time-text about-project__end'>Back-end</p>
          <p className='about-project__front about-project__time-text about-project__end'>Front-end</p>
        </div>
      </div>
    </section>
  )
}
