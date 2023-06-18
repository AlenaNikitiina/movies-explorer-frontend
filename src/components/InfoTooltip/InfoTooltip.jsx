import registration_success from "../../images/registration_success.png";
import registration_unsuccess from "../../images/registration_unsuccess.png";

export default function InfoTooltip( { isOpen, onClose, setIsInfoTooltip, registrationForm} ) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : "" }`} >
      <div className="popup__container form">
        <button
          className="popup__close-button button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        >close</button>
        <img className="popup__image"
          src={registrationForm.status ? registration_success : registration_unsuccess}
          alt="статус регистрации"
        />
        <h3 className="popup__text">{registrationForm.text}</h3>
      </div>
    </section>
  )
}
