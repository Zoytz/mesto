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

import {initialCards, profileEditForm, formNameInput, formJobInput, cardEditForm, cardNameInput, cardImageInput, title, popupImage, popupTitle, cards, popupTypeText, popupTypeCard, popupTypeImage, addCardButton, editProfileButton} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import {FormValidator, validationSettings} from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithProfileForm = new PopupWithForm('.popup_type_text', profileFormSubmitHandler);
popupWithProfileForm.setEventListeners();

function handleCardClick(link, name){
  popupWithImage.open(link, name);
};

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

editProfileButton.addEventListener('click', () =>{
  popupWithProfileForm.open();
  addInputValue();
  formTypeProfile.resetValidation();
} )
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithCardForm = new PopupWithForm('.popup_type_card', cardFormSubmitHandler)
popupWithCardForm.setEventListeners();






