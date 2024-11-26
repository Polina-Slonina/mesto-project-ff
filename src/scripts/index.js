import {initialCards} from './cards.js';
import '../pages/index.css';


// @todo: Темплейт карточки

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;

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
const popupCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formElementCard = document.forms['new-place'];
const placeNameInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements.link;


// @todo: Функция создания карточки

const сreateCard = ({name, link}, handleDeleteButton, openImages, likeCard) => {
  const placesItem = cardTemplate.querySelector('.card').cloneNode(true);

  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  placesItem.querySelector('.card__title').textContent = name;
  
  placesItem.querySelector('.card__delete-button').addEventListener('click', handleDeleteButton); 
  placesItem.querySelector('.card__image').addEventListener('click', openImages);
  placesItem.querySelector('.card__like-button').addEventListener('click', likeCard);

  return placesItem;
}

// @todo: Функция удаления карточки

const handleDeleteButton = (evt) => {
  const event = evt.target;
  const delitCard = event.closest('.places__item');
  delitCard.remove();
}

// @todo функции клика модальные окна
// @todo: Открытие и закрытие модального окна

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  closebutton(popup); 
}
const closebutton = (popup) => {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button')) {
        closePopup(popup);
      };
    });      
  });  
  const pressingEscape = (evt) =>  {
    if (evt.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener('keydown', pressingEscape);
   }
   } 
  document.addEventListener('keydown', pressingEscape);  
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopup);
}

editButton.addEventListener('click', () => {
  openPopup(popupEdits);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addbutton.addEventListener('click', () => {
  openPopup(popupNewCards);
  formElementCard.reset();
});

// @todo: клик по изображению 

const openImages = (evt) => {
  const event = evt.target;
  popupImages.src = event.src;
  popupImages.alt = event.alt;
  popupCaption.textContent = event.alt; 
  openPopup(popupcardImages);
}

//@todo функция лайка карточки

const likeCard = (evt) => {
  const heart = evt.target;
  heart.classList.toggle('card__like-button_is-active');
}

// @todo: обработчик отправки формы

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

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