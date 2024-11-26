import { popupcardImages, popupImages, popupCaption, popups } from './index.js';


// @todo функции клика модальные окна
// @todo: Открытие и закрытие модального окна

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  closebutton(popup);
  pressingEscape(popup);
}

//@todo функция закрытия карточки

export const closebutton = (popup) => {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button')) {
        closePopup(popup);
      };
    });      
  });  
   
   document.addEventListener('keydown', pressingEscape); 
}


export const pressingEscape = (evt) =>  {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
    document.removeEventListener('keydown', pressingEscape);
   };
 } 


export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopup);
}

// @todo: клик по изображению 

export const openImages = (evt) => {
  const event = evt.target;
  popupImages.src = event.src;
  popupImages.alt = event.alt;
  popupCaption.textContent = event.alt; 
  openPopup(popupcardImages);
}


