/* Карточки "из коробки" */

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Формы */

/* Форма редактирования профиля */

const profileEditForm = document.querySelector('.form_type_profile');
const formNameInput = document.querySelector('.form__input_type_name');
const formJobInput = document.querySelector('.form__input_type_job');
// const profileFormButton = profileEditForm.querySelector('.form__button');

/* Форма редактирования карточки */

const cardEditForm = document.querySelector('.form_type_card');
const cardNameInput = document.querySelector('.form__input_type_place-name');
const cardImageInput = document.querySelector('.form__input_type_place-image');
// const cardFormButton = cardEditForm.querySelector('.form__button');

/* Профиль */

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

/* Попап изображения */

export const popupImage = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title');

/* Карточки */

// const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
// const cardImage = document.querySelector('.card__image');

/*Попапы*/

const popupTypeText = document.querySelector('.popup_type_text');
const popupTypeCard = document.querySelector('.popup_type_card');
export const popupTypeImage = document.querySelector('.popup_type_image');

/* Кнопки на странице */

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

/* Все слушатели на странице */

addCardButton.addEventListener('click', function () {
  openPopup(popupTypeCard);
  formTypeCard.resetValidation();
});

editProfileButton.addEventListener('click', function () {
  addInputValue();
  formTypeProfile.resetValidation();
  openPopup(popupTypeText);
});

// function setListenersOnCard(card) {
//   /* Слушатель на кнопку удаления */
//   const cardDelButton = card.querySelector('.card__del-btn');
//   cardDelButton.addEventListener('click', function () {
//     delCard(card);
//   });
//   /* Слушатель на изображение */
//   const cardImage = card.querySelector('.card__image');
//   const cardTitle = card.querySelector('.card__title');
//   cardImage.addEventListener('click', function () {
//     popupImage.setAttribute('src', cardImage.src);
//     popupImage.setAttribute('alt', cardTitle.textContent);
//     popupTitle.textContent = cardTitle.textContent;
//     openPopup(popupTypeImage);
//   });
//   /* Слушатель на лайкусик */
//   const cardLikeBtn = card.querySelector('.card__like');
//   cardLikeBtn.addEventListener('click', function () {
//     cardLikeBtn.classList.toggle('card__like_active');
//   });
// };

/* Закрытие попапа на крестик и по нажатию на попап */

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    };
  });
});

/* Функция закрытия попапа с кнопки Escape */

function closeByEscape(evt) {
  if (evt.key !== 'Escape') {
    return
  } else {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  };
};

/* Функция добавления карточек на страницу */

// function createCard(dataText, dataImage) {

//   const newCard = cardTemplate.querySelector('.card').cloneNode(true);

//   newCard.querySelector('.card__image').src = dataImage;
//   newCard.querySelector('.card__image').alt = dataText;
//   newCard.querySelector('.card__title').textContent = dataText;

//   setListenersOnCard(newCard);

//   return newCard;
// };

// /* Функция удаления карточки */

// function delCard(card) {
//   card.remove();
// };

/* Функция заполнения ипутов формы профиля */

function addInputValue() {
  formNameInput.value = title.textContent;
  formJobInput.value = subtitle.textContent;
};

/* Функция закрытия попапов */

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEscape);
};

/* Функция открытия попапов */

export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEscape);
};

/* Обработчик формы редактирования профиля */

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  title.textContent = formNameInput.value;
  subtitle.textContent = formJobInput.value;

  closePopup(evt.target.closest('.popup'));
};

/* Слушатель событий формы заполнения профиля */

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

/* Обработчик формы добавления карточки */

function cardFormSubmitHandler(evt) {

  evt.preventDefault();

  const newCard = createCard(cardImageInput.value, cardNameInput.value, '#card');
  cards.prepend(newCard);
  cardNameInput.value = null;
  cardImageInput.value = null;
  closePopup(evt.target.closest('.popup'));
};

/* Слушатель событий формы карточки */

cardEditForm.addEventListener('submit', cardFormSubmitHandler);

/* Функция карточек "из коробки" */

function createCard(link, name, cardSelector){
  const card = new Card(link, name, cardSelector).createCard();
  return card;
}

initialCards.forEach(function (item) {

  const newCard = createCard(item.link, item.name, '#card');
  cards.append(newCard);
});

const formTypeProfile = new FormValidator(validationSettings, profileEditForm);
formTypeProfile.enableValidation();
const formTypeCard = new FormValidator(validationSettings, cardEditForm);
formTypeCard.enableValidation();

import { Card } from './Card.js';
import {FormValidator, validationSettings} from './FormValidator.js';