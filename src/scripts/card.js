// import { cardTemplate } from './index.js';
import { getLikesCard, deleteLikesCard } from './api.js';
import { openPopup } from './modal.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки

export const сreateCard = ({name, link}, openImages, likeCard, cardUserId, userId, cardId, cardlikes, handleDelete) => {
  const placesItem = cardTemplate.querySelector('.card').cloneNode(true);
  const likeLength = placesItem.querySelector('.card__like-quantity');
  
  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  placesItem.querySelector('.card__title').textContent = name;

  likeLength.textContent = cardlikes.length;
  cardlikes.forEach((like) => {
    if (like._id === userId) {
    placesItem.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    } else {
    placesItem.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
    };
  });

  if (cardUserId !== userId) {
    placesItem.querySelector('.card__delete-button').classList.add('card__delete-button-invisible')
  };
  
  placesItem.querySelector('.card__image').addEventListener('click', () => openImages({name, link}));

  placesItem.querySelector('.card__like-button').addEventListener('click', (evt) => {
    if (placesItem.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
      deleteLikesCard(cardId).then((likesCard) => {
        likeCard(evt);
        likeLength.textContent = likesCard.likes.length;
      }).catch((err) => console.log(err));
    } else {
      getLikesCard(cardId).then((likesCard) => {
        likeCard(evt);
        likeLength.textContent = likesCard.likes.length;
      }).catch((err) => console.log(err));
    }
  })
  
  placesItem.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    openPopup(document.querySelector('.popup_delete'));
    handleDelete(cardId, evt);
  });

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
  if (heart.classList.contains('card__like-button_is-active')) {
    heart.classList.remove('card__like-button_is-active');
  } else {
    heart.classList.add('card__like-button_is-active');
  }
}
