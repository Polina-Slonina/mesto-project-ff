// @todo: Открытие модального окна

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseEscape);
}

//@todo функция закрытия при нажатии на esc

const handleCloseEscape = (evt) =>  {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
   };
 } 

 //@todo закрытие модального окна

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseEscape);
}