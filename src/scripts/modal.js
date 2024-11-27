// @todo: Открытие модального окна

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseEscape);
  popup.addEventListener('click', handleClosebutton)
}

//@todo функция закрытия на кнопку поапа

const handleClosebutton = (evt) => {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) {
    closePopup(evt.currentTarget);
  };
}

//@todo функция закрытия при клике на оверлей

export const handleCloseOverlay = (evt) => {
  if ( evt.target.classList.contains('popup') ) {
    closePopup(evt.target);
  };
}

//@todo функция закрытия при нажатии на esc

const handleCloseEscape = (evt) =>  {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
   };
 } 

 //@todo закрытие модального окна

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handleCloseOverlay);
  document.removeEventListener('keydown', handleCloseEscape);
}