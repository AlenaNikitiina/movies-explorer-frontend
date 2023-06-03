// import { link } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  return(
    <section className="not-found">
      <div className="not-found__content">
        <p className="not-found__title">404</p>
        <p className="not-found__pharagraph">Страница не найдена</p>
      </div>

    </section>
  )
}

//       <link to="/" className="not-found__link link">Назад</link>