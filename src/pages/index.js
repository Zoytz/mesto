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

import { initialCards, profileEditForm, formNameInput, formJobInput, cardEditForm, cardNameInput, cardImageInput, title, popupImage, popupTitle, cards, popupTypeText, popupTypeCard, popupTypeImage, addCardButton, editProfileButton, avatarEditForm, avatarEditButton, avatar } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator, validationSettings } from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js'

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithProfileForm = new PopupWithForm('.popup_type_text', profileFormSubmitHandler);
popupWithProfileForm.setEventListeners();

const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm', delCardSubmitHandler);
popupWithConfirm.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', avatarFormSubmitHandler);
popupWithAvatar.setEventListeners();



function handleDelBtnClick(cardId, card){
  popupWithConfirm.open(cardId, card);
};


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    'Content-Type': 'application/json',
    authorization: '30686ebe-9b4e-4da0-b73e-617cab53800b',
  }
})


let userData = {};

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userData = data;
  })
  .catch(err => console.log(err, data));

// function createCard(data, cardSelector, boolean) {
//   const card = new Card(data, cardSelector, handleCardClick).createCard();
//   sectionDeafaultCards.addItem(card, boolean);
// };

api.getInitialCards()
  .then((res) => {
    const sectionDeafaultCards = new Section({
      items: res,
      renderer: (item) => {
        const card = new Card(item, '#card', handleCardClick, userData, api, handleDelBtnClick).createCard();
        sectionDeafaultCards.addItem(card, true);
      }
    }, '.cards')
    sectionDeafaultCards.rendererItems();
  })
  .catch((err) => {console.log('Ошибочка вышла', err)});



function handleCardClick(link, name) {
  popupWithImage.open(link, name);
};

avatarEditButton.addEventListener('click', function () {
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

function profileFormSubmitHandler(data, form) {
  const formBtn = form.querySelector('.form__button') ;
  formBtn.textContent = 'Сохранение...';
  api.editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithProfileForm.close();
    })
    .catch((err) => {console.log('Ошибочка вышла', err)})
    .finally(() => {formBtn.textContent = formBtn.value;})
};

function cardFormSubmitHandler(data, form) {
  const formBtn = form.querySelector('.form__button') ;
  formBtn.textContent = 'Сохранение...';
  api.addCard(data)
    .then((res) => {
      const sectionAddCards = new Section({
      items: res,
      renderer: (item) => {
        const card = new Card(item, '#card', handleCardClick, userData, api, handleDelBtnClick).createCard();
        sectionAddCards.addItem(card, false);
      }
    }, '.cards')
    sectionAddCards.renderer(res);
    popupWithCardForm.close();
  })
  .catch((err) => {console.log('Ошибочка вышла', err)})
  .finally(() => {formBtn.textContent = formBtn.value;})
};

function delCardSubmitHandler(cardID, card) {
  api.deleteCard(cardID)
    .then((res) => {
      card.remove();
      popupWithConfirm.close();
    })
    .catch((err) => {console.log('Ошибочка вышла', err)});
  
}


function avatarFormSubmitHandler(data, form) {
  const formBtn = form.querySelector('.form__button') ;
  formBtn.textContent = 'Сохранение...';
  api.editUserAvatar(data)
    .then((res) => {
      avatar.src = res.avatar;
      popupWithAvatar.close();
    })
    .catch(err => console.log(err, res))
    .finally(() => {formBtn.textContent = formBtn.value;});
}

// const sectionDeafaultCards = new Section({
//   items: cardsFromServer, 
//   renderer: (item) => {createCard(item, '#card', true)}
// }, '.cards')
// sectionDeafaultCards.rendererItems();




const formTypeProfile = new FormValidator(validationSettings, profileEditForm);
formTypeProfile.enableValidation();
const formTypeCard = new FormValidator(validationSettings, cardEditForm);
formTypeCard.enableValidation();
const formTypeAvatar = new FormValidator(validationSettings, avatarEditForm);
formTypeAvatar.enableValidation();


editProfileButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  addInputValue();
  formTypeProfile.resetValidation();
})
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const popupWithCardForm = new PopupWithForm('.popup_type_card', cardFormSubmitHandler)
popupWithCardForm.setEventListeners();