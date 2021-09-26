const formElement = document.querySelector('.form');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const formNameInput = document.querySelector('.form__input_type_name');
const formJobInput = document.querySelector('.form__input_type_job');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');
const cardNameInput = document.querySelector('.form__input_type_place-name');
const cardImageinput = document.querySelector('.form__input_type_place-image');

/*Попапы*/

const popupTypeText = document.querySelector('.popup_type_text');
const popupTypeCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');

/* Кнопка редактирования профиля */

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function (){
  return openPopup (popupTypeText), addInputValue ();
});

/* Кнопка добавления карточки */

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function(){
  return openPopup (popupTypeCard);
});

/* Кнопка открытия изображения */

const cards = document.querySelector('.cards');
cards.addEventListener('click', function(evt){
  const currentCard = evt.target.closest('.card');
  const currentCardTitle = currentCard.querySelector('.card__title');
  const currentCardImage = currentCard.querySelector('.card__image').getAttribute('src');
  popupImage.setAttribute('src', currentCardImage);
  popupTitle.textContent = currentCardTitle.textContent;
  return openPopup(popupTypeImage);
});

/* Функция заполнения ипутов формы профиля */

function addInputValue () {
  formNameInput.value = title.textContent;
  formJobInput.value = subtitle.textContent;
};
/* Функция получения значений карточки */

function getCurentCardValues (evt) {
  const currentCard = cards.querySelector('.card')
}

/* Функция закрытия попапов */

function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_active');
};

function openPopup (popup) {
  popup.classList.add('popup_active');
  const popupActive = document.querySelector('.popup_active');
  const closeBtn = popupActive.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', function(evt){
    evt.target.closest('.popup').classList.remove('popup_active');
  });
};

function formSubmitHandler (evt) {
  evt.preventDefault();

  title.textContent = formNameInput.value;
  subtitle.textContent = formJobInput.value;
  
  closePopup(evt);
};

formElement.addEventListener('submit', formSubmitHandler);
