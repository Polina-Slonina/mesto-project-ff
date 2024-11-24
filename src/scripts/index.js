import {initialCards} from './cards.js'
import '../pages/index.css';

// @todo: Темплейт карточки

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;

// клонируем карточку

// const placesItem = cardTemplate.querySelector('.card').cloneNode(true);

// @todo: DOM узлы

//наполняем содержимым

const placeslist = content.querySelector('.places__list');
const addbutton = content.querySelector('.profile__add-button');
const editButton = content.querySelector('.profile__edit-button');

// @todo: Функция создания карточки

const cardCreate = (cardData, handleDeleteButton) => {
  const placesItem = cardTemplate.querySelector('.card').cloneNode(true);
  // const placesItemCard = placesItem.cloneNode(true);

  placesItem.querySelector('.card__image').src = cardData.link;
  placesItem.querySelector('.card__image').alt = cardData.name;
  placesItem.querySelector('.card__title').textContent = cardData.name;
  
  placesItem.querySelector('.card__delete-button').addEventListener('click', handleDeleteButton); 
  
  return placesItem;
}

// @todo: Функция удаления карточки

const handleDeleteButton = (evt) => {
  const event = evt.target;
  const delitCard = event.closest('.places__item');
  delitCard.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(placesItem => { 
  const newCard = cardCreate(placesItem, handleDeleteButton);
  placeslist.prepend(newCard);
});



// const renderCard = placesItem => { 
//   const newCard = cardCreate(placesItem, handleDeleteButton);
//   placeslist.prepend(newCard);
// }

// initialCards.forEach(function (placesItem) { 
//     const newCard = cardCreate(placesItem, handleDeleteButton);
//     placeslist.prepend(newCard);
// });