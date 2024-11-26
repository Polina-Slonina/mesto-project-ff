import { cardTemplate } from './index.js';

// @todo: Функция создания карточки

export const сreateCard = ({name, link}, handleDeleteButton, openImages, likeCard) => {
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

export const handleDeleteButton = (evt) => {
  const event = evt.target;
  const delitCard = event.closest('.places__item');
  delitCard.remove();
}

//@todo функция лайка карточки

export const likeCard = (evt) => {
  const heart = evt.target;
  heart.classList.toggle('card__like-button_is-active');
}
