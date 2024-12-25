
// @todo: конфигурация для запросов на сервер

// import { data } from "autoprefixer";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'c1fee65e-44c8-4dd1-a4b8-ab0f3ad546a8',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  /* отклоняем промис, если сервер вернул ошибку */
      return Promise.reject(`Ошибка: ${res.status}`);
}

// @todo: Загрузка информации о пользователе с сервера 

export const getInitalUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
}

// @todo: Загрузка карточек

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(handleResponse)
} 

// @todo: Обновление информации о пользователе

export const getSendingUsers = (title, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title.textContent,
      about: description.textContent
    })
  })
  .then(handleResponse)
}

// @todo: Добавление новой карточки

export const getSendingCards = (newCardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCardData)
  })
  .then(handleResponse)
}

// @todo:  Удаление карточки

export const deletingCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

// @todo: Постановка лайка

export const getLikesCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

// @todo: снятие лайка

export const deleteLikesCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

// @todo: обновление аватара 

export const updateAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar
    })
  })
  .then(handleResponse)
}