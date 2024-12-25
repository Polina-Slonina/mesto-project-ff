
import { сreateCard, handleDeleteButton, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { validationConfig, enableValidation,  clearValidation } from './validation.js';
import { getInitalUsers, getInitialCards, getSendingUsers, getSendingCards, updateAvatar, deletingCard } from './api.js';
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
const profileForm = document.querySelectorAll('.popup__form');
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

// @todo: клик по изображению 

const openImages = ({name, link}) => {
  popupImages.src = link;
  popupImages.alt = name;
  popupCaptionImage.textContent = name;
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
});

addbutton.addEventListener('click', () => {
  openPopup(popupNewCards);
  formElementCard.reset();
});

imageButton.addEventListener('click', () => {
  openPopup(popupImadeAvatar);
  formAvatar.reset();
})

// @todo: Вызовем функцию валидации формы
enableValidation(validationConfig); 

// @todo: Вызовем функцию очистки ошибок валидации
profileForm.forEach((formElement) => clearValidation(formElement, validationConfig));

// @todo: иницилизация данных с сервера

Promise.all([getInitalUsers(), getInitialCards()]).then(([users, cards]) => {
  userId = users._id
  document.querySelector('.profile__title').textContent = users.name;
  document.querySelector('.profile__description').textContent = users.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${users.avatar})`;
  
  cards.forEach((card) => {
    renderCard(card, card.owner._id, userId, card._id, card.likes);
  });
  return userId;
}).catch(({errUser, errCard}) => {
  console.log(errUser);
  console.log(errCard);
});

//пока данные сохраняются
const uploadingData = (evt, textButton) => {
  evt.target.querySelector('.popup__button').textContent = textButton;
} 

// @todo: обработчик отправки формы

function handleFormProfileEdit(evt) {
  evt.preventDefault(); 
  uploadingData(evt, 'Сохранение...');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  getSendingUsers(profileTitle, profileDescription).then((users) => {
    users.name,
    users.about
  }).catch((err) => console.log(err))
  .finally(() => uploadingData(evt, 'Сохранить'));

  closePopup(popupEdits);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormProfileEdit); 

//@todo добавление своей карточки

const addCardPageForm = (evt, userId) => {
  evt.preventDefault();
  uploadingData(evt, 'Сохранение...');
  const newCardData= {
    name: placeNameInput.value,
    link: linkInput.value
  };

  getSendingCards(newCardData).then((cards) => {
    renderCard(cards, cards.owner._id, userId, cards._id, cards.likes);
}).catch((err) => console.log(err))
.finally(() => uploadingData(evt, 'Сохранить'));

  formElementCard.reset();
  closePopup(popupNewCards);
}

formElementCard.addEventListener('submit', (evt) => addCardPageForm(evt, userId)); 

// @todo: обновление аватара

const handleFormAvatar = (evt) => {
  evt.preventDefault();
  uploadingData(evt, 'Сохранение...');
  profileImage.style.backgroundImage = `url(${linkAvatarInput.value})`;
  
  updateAvatar(linkAvatarInput.value).then((link) => {
    link.avatar
  }).catch((err) => console.log(err))
  .finally(() => uploadingData(evt, 'Сохранить'));
  
  formAvatar.reset();
  closePopup(popupImadeAvatar);
}

formAvatar.addEventListener('submit', handleFormAvatar);

//@todo: удаление карточки по подтверждению от пользователя
const handleCardDelete = (evt) => {
  evt.preventDefault();

  deletingCard(idCardForDelete).then(handleDeleteButton(evtCardDelete))
  .catch((err) => console.log(err));
  closePopup(popupDelete);   
}

formDelete.addEventListener('submit', handleCardDelete);

// @todo: Вывести карточки на страницу
const renderCard = (placesItem, cardUserId, userId, cardId, cardlikes) => { 
  const  handleDelete = (id, cardDelete) => {
    idCardForDelete = id;
    evtCardDelete = cardDelete;
  }
  const newCard = сreateCard(placesItem, openImages, likeCard, cardUserId, userId, cardId, cardlikes, handleDelete);
  placeslist.prepend(newCard);
}