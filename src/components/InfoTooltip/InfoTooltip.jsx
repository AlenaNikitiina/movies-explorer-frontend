import './InfoTooltip.css';
import registration_success from "../../images/registration_success.png";
import registration_unsuccess from "../../images/registration_unsuccess.png";

export default function InfoTooltip( { isOpen, onClose, registrationForm, onOverlayClick} ) {
  return (
    <section
      className={`po ${isOpen ? 'po_opened' : "" }`}
      onClick={onOverlayClick}
    >
      <div className="po__container">
        <button
          className="po__close-button button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img className="po__image"
          src={registrationForm.status ? registration_success : registration_unsuccess}
          alt="статус регистрации"
        />
        <h3 className="po__text">{registrationForm.text}</h3>
      </div>
    </section>
  )
}
