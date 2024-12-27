
import { сreateCard, handleDeleteButton, likeCallback } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation,  clearValidation } from './validation.js';
import { getInitalUsers, getInitialCards, editUsers, addCards, updateAvatar, deleteCard } from './api.js';
import '../pages/index.css';



// клонируем карточку
// @todo: DOM узлы
//наполняем содержимым

const placeslist = document.querySelector('.places__list');
const addbutton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const imageButton = document.querySelector('.profile__image-button');
const popupEdits = document.querySelector('.popup_type_edit');
const popupNewCards = document.querySelector('.popup_type_new-card');
const popupImadeAvatar = document.querySelector('.popup_avatar');
const popupDelete = document.querySelector('.popup_delete');
const popupCardImages = document.querySelector('.popup_type_image');
const popupImages = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const formList = document.querySelectorAll('.popup__form');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formElementCard = document.forms['new-place'];
const placeNameInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements.link;
const formAvatar = document.forms['new-avatar'];
const linkAvatarInput = formAvatar.elements.link;
const formDelete = document.forms.delete;
let userId = null;
let idCardForDelete = null;
let evtCardDelete = null;

// @todo: объект с настройками валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// @todo: клик по изображению 

const openImages = (card) => {
  popupImages.src = card.link;
  popupImages.alt = card.name;
  popupCaptionImage.textContent = card.name;
  openPopup(popupCardImages);
}

//todo слушатели оверлея и кнопое
 document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(popup);
      };
    });      
  });

// @todo: слушатели кнопки открытия попапа

editButton.addEventListener('click', () => {
  openPopup(popupEdits);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEdits, validationConfig)
});

addbutton.addEventListener('click', () => {
  openPopup(popupNewCards);
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig)
});

imageButton.addEventListener('click', () => {
  openPopup(popupImadeAvatar);
  formAvatar.reset();
  clearValidation(popupImadeAvatar, validationConfig)
})

// @todo: Вызовем функцию валидации формы
enableValidation(validationConfig); 

// @todo: Вызовем функцию очистки ошибок валидации
formList.forEach((formElement) => clearValidation(formElement, validationConfig));

// @todo: иницилизация данных с сервера

Promise.all([getInitalUsers(), getInitialCards()]).then(([user, cards]) => {
  userId = user._id
  document.querySelector('.profile__title').textContent = user.name;
  document.querySelector('.profile__description').textContent = user.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;
  
  cards.forEach((card) => {
    renderCard(card, userId);
  });
  return userId;
}).catch(({errUser, errCard}) => {
  console.log(errUser);
  console.log(errCard);
});

//пока данные сохраняются
const setSubmitButtonText = (evt, textButton) => {
  evt.target.querySelector('.popup__button').textContent = textButton;
} 

// @todo: обработчик отправки формы

function handleFormProfileEdit(evt) {
  evt.preventDefault(); 
  setSubmitButtonText(evt, 'Сохранение...');
  
  editUsers(nameInput.value, jobInput.value).then((users) => {
    profileTitle.textContent = users.name;
    profileDescription.textContent = users.about;
    users.name,
    users.about
  })
  .catch((err) => console.log(err))
  .finally(() => setSubmitButtonText(evt, 'Сохранить'));

  closePopup(popupEdits);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormProfileEdit); 

//@todo добавление своей карточки

const addCardPageForm = (evt, userId) => {
  evt.preventDefault();
  setSubmitButtonText(evt, 'Сохранение...');
  const newCardData= {
    name: placeNameInput.value,
    link: linkInput.value
  };

  addCards(newCardData).then((card) => {
    renderCard(card, userId);
}).catch((err) => console.log(err))
.finally(() => setSubmitButtonText(evt, 'Сохранить'));

  formElementCard.reset();
  closePopup(popupNewCards);
}

formElementCard.addEventListener('submit', (evt) => addCardPageForm(evt, userId)); 

// @todo: обновление аватара

const handleFormAvatar = (evt) => {
  evt.preventDefault();
  setSubmitButtonText(evt, 'Сохранение...');
  
  updateAvatar(linkAvatarInput.value).then((link) => {
    profileImage.style.backgroundImage = `url(${link.avatar})`;
    link.avatar
  }).catch((err) => console.log(err))
  .finally(() => setSubmitButtonText(evt, 'Сохранить'));
  
  formAvatar.reset();
  closePopup(popupImadeAvatar);
}

formAvatar.addEventListener('submit', handleFormAvatar);

//@todo: удаление карточки по подтверждению от пользователя
const handleCardDelete = (evt) => {
  evt.preventDefault();

  deleteCard(idCardForDelete).then(handleDeleteButton(evtCardDelete))
  .catch((err) => console.log(err));
  closePopup(popupDelete);   
}

formDelete.addEventListener('submit', handleCardDelete);

// @todo: Вывести карточки на страницу
const renderCard = (card, userId) => { 
  const  handleDelete = (id, cardDelete) => {
    openPopup(document.querySelector('.popup_delete'));
    idCardForDelete = id;
    evtCardDelete = cardDelete;
  }
  const newCard = сreateCard(card, openImages, likeCallback, userId, handleDelete);
  placeslist.prepend(newCard);
}