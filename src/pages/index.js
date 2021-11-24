/* Карточки "из коробки" */
import './index.css';

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from '../images/Logo.svg';
import jamesImage from '../images/Avatar.webp';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
];

import {initialCards, profileEditForm, formNameInput, formJobInput, cardEditForm, cardNameInput, cardImageInput, title, popupImage, popupTitle, cards, popupTypeText, popupTypeCard, popupTypeImage, addCardButton, editProfileButton, avatarEditForm, avatarEditButton} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import {FormValidator, validationSettings} from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

fetch('https://nomoreparties.co/v1/cohort-30/users/me', {
  headers: {
    method: 'GET',
    authorization: '30686ebe-9b4e-4da0-b73e-617cab53800b',
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then((data) => {
    console.log(data);
  });

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithProfileForm = new PopupWithForm('.popup_type_text', profileFormSubmitHandler);
popupWithProfileForm.setEventListeners();

const popupWithConfirm = new PopupWithForm('.popup_type_confirm', profileFormSubmitHandler);
popupWithConfirm.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', profileFormSubmitHandler);
popupWithAvatar.setEventListeners();

function handleCardClick(link, name){
  popupWithImage.open(link, name);
};

avatarEditButton.addEventListener('click', function (){
  popupWithAvatar.open();
  formTypeAvatar.resetValidation();
});

addCardButton.addEventListener('click', function () {
  popupWithCardForm.open();
  formTypeCard.resetValidation();
});

function addInputValue() {
  const userValues = userInfo.getUserInfo();
  formNameInput.value = userValues.name;
  formJobInput.value = userValues.job;
};

function profileFormSubmitHandler(data) {
  userInfo.setUserInfo(data);
  popupWithProfileForm.close();
};

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
const formTypeAvatar = new FormValidator(validationSettings, avatarEditForm);
formTypeAvatar.enableValidation();


editProfileButton.addEventListener('click', () =>{
  popupWithProfileForm.open();
  addInputValue();
  formTypeProfile.resetValidation();
} )
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithCardForm = new PopupWithForm('.popup_type_card', cardFormSubmitHandler)
popupWithCardForm.setEventListeners();






