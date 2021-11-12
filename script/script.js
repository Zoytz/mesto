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
import PopupWithImage from './PopupWithImage.js';
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();
export default function handleCardClick(link, name){
  popupWithImage.open(link, name);
}

const profileEditForm = document.querySelector('.form_type_profile');
const formNameInput = document.querySelector('.form__input_type_name');
const formJobInput = document.querySelector('.form__input_type_job');

const cardEditForm = document.querySelector('.form_type_card');
const cardNameInput = document.querySelector('.form__input_type_place-name');
const cardImageInput = document.querySelector('.form__input_type_place-image');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

export const popupImage = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title');
const cards = document.querySelector('.cards');

const popupTypeText = document.querySelector('.popup_type_text');
const popupTypeCard = document.querySelector('.popup_type_card');
export const popupTypeImage = document.querySelector('.popup_type_image');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

addCardButton.addEventListener('click', function () {
  popupWithCardForm.open();
  formTypeCard.resetValidation();
});

function addInputValue() {
  const userValues = userInfo.getUserInfo();
  formNameInput.value = userValues.name;
  formJobInput.value = userValues.job;
};

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(formNameInput.value, formJobInput.value);

  popupWithProfileForm.close();
};

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

function cardFormSubmitHandler(data) {
  const newCard = createCard(data.placeImage, data.placeName, '#card', false);
  
  popupWithCardForm.close();
};



const sectionDeafaultCards = new Section({
  items: initialCards, 
  renderer: (item) => {createCard(item.link, item.name, '#card', true)}
}, '.cards')
sectionDeafaultCards.rendererItems();



function createCard(link, name, cardSelector, boolean){
  const card = new Card(link, name, cardSelector, handleCardClick).createCard();
  sectionDeafaultCards.addItem(card, boolean);
};

const formTypeProfile = new FormValidator(validationSettings, profileEditForm);
formTypeProfile.enableValidation();
const formTypeCard = new FormValidator(validationSettings, cardEditForm);
formTypeCard.enableValidation();

import { Card } from './Card.js';
import {FormValidator, validationSettings} from './FormValidator.js';


import PopupWithForm from './PopupWithForm.js';
const popupWithProfileForm = new PopupWithForm('.popup_type_text', () => profileFormSubmitHandler);
popupWithProfileForm.setEventListeners();

editProfileButton.addEventListener('click', () =>{
  popupWithProfileForm.open();
  addInputValue();
  formTypeProfile.resetValidation();
} )

import UserInfo from './UserInfo.js';
import Section from './Section.js';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithCardForm = new PopupWithForm('.popup_type_card', cardFormSubmitHandler)
popupWithCardForm.setEventListeners();






