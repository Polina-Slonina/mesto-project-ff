import { initialCards } from './cards.js';
import { сreateCard, handleDeleteButton, likeCard } from './card.js';
import { openPopup, handleCloseOverlay } from './modal.js';
import '../pages/index.css';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// клонируем карточку
// @todo: DOM узлы
//наполняем содержимым

const placeslist = document.querySelector('.places__list');
const addbutton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupEdits = document.querySelector('.popup_type_edit');
const popupNewCards = document.querySelector('.popup_type_new-card');
const popupcardImages = document.querySelector('.popup_type_image');
const popupImages = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formElementCard = document.forms['new-place'];
const placeNameInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements.link;


// @todo: клик по изображению 

const openImages = ({name, link}) => {
  popupImages.src = link;
  popupImages.alt = name;
  popupCaptionImage.textContent = name; 
  openPopup(popupcardImages);
}

//todo слушатели оверлея попапа
document.addEventListener('click', handleCloseOverlay);

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

// @todo: обработчик отправки формы

function handleFormProfileEdit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormProfileEdit); 

//@todo добавление своей карточки

function addCardPageForm(evt) {
  evt.preventDefault(); 
  const newCardData= {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  renderCard(newCardData);
  formElementCard.reset();
}

formElementCard.addEventListener('submit', addCardPageForm); 

// @todo: Вывести карточки на страницу
const renderCard = placesItem => { 
  const newCard = сreateCard(placesItem, handleDeleteButton, openImages, likeCard);
  placeslist.prepend(newCard);
}

initialCards.forEach(renderCard);