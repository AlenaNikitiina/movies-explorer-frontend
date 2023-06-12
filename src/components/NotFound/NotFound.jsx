import { Link } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  return(
    <section className="not-found">
      <p className="not-found__title">404</p>
      <p className="not-found__pharagraph">Страница не найдена</p>
      <Link to="/" className="not-found__link link">Назад</Link>
    </section>
  )
}
