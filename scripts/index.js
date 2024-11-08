// @todo: Темплейт карточки

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;

// клонируем карточку

const placesItem = cardTemplate.querySelector('.card').cloneNode(true);

// @todo: DOM узлы

//наполняем содержимым

const placeslist = content.querySelector('.places__list');
const addbutton = content.querySelector('.profile__add-button');
const editButton = content.querySelector('.profile__edit-button');


// @todo: Функция создания карточки

const cardCreate = (elements) => {
  const placesItemCard = placesItem.cloneNode(true);
  // const cardDelete = document.querySelector('.card__delete-button');

  placesItemCard.querySelector('.card__image').src = elements.link;
  placesItemCard.querySelector('.card__image').alt = elements.name;
  placesItemCard.querySelector('.card__title').textContent = elements.name;

  placeslist.append(placesItemCard);

  placesItemCard.querySelector('.card__delete-button').addEventListener('click', cardDeleteButtons);
}
// @todo: Функция удаления карточки

const cardDeleteButtons = (evt) => {
  const event = evt.target;
  const delitCard = event.parentElement;
  delitCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardCreate);
