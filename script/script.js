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

/* Форма редактирования карточки */

const cardEditForm = document.querySelector('.form_type_card');
let cardNameInput = document.querySelector('.form__input_type_place-name');
let cardImageInput = document.querySelector('.form__input_type_place-image');

/* Профиль */

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

/* Попап изображения */

const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');

/* Карточки */

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const cardImage = document.querySelector('.card__image');

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

/* Функция добавления карточек на страницу */

function addCardOnPage() {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  
  newCard.querySelector('.card__image').src = cardImageInput.value;
  newCard.querySelector('.card__image').alt = cardNameInput.value;
  newCard.querySelector('.card__title').textContent = cardNameInput.value;
  
  setCardListeners(newCard);

  cards.prepend(newCard);
};

/* Функция удаления карточки */

function delCard(evt) {
  const card = evt.currentTarget.closest('.card');
  card.remove();
};

/* Функция добавления слушателей на карточку */

function setCardListeners(card) {
  card.querySelector('.card__del-btn').addEventListener('click', delCard);
  card.querySelector('.card__image').addEventListener('click', function(evt){
    const currentCard = evt.target.closest('.card');
    const currentCardTitle = currentCard.querySelector('.card__title');
    const currentCardImage = currentCard.querySelector('.card__image').getAttribute('src');
    popupImage.setAttribute('src', currentCardImage);
    popupImage.setAttribute('alt', currentCardTitle.textContent);
    popupTitle.textContent = currentCardTitle.textContent;
    return openPopup(popupTypeImage);
    });
  card.querySelector('.card__like').addEventListener('click', function(evt){
    const currentCard = evt.target.closest('.card');
    const currentCardLike = currentCard.querySelector('.card__like');
    currentCardLike.classList.toggle('card__like_active');
    }); 
};

/* Функция заполнения ипутов формы профиля */

function addInputValue () {
  formNameInput.value = title.textContent;
  formJobInput.value = subtitle.textContent;
};

/* Функция закрытия попапов */

function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_active');
};

/* Функция открытия попапов */

function openPopup (popup) {
  popup.classList.add('popup_active');
  const popupActive = document.querySelector('.popup_active');
  const closeBtn = popupActive.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', function(evt){
    evt.target.closest('.popup').classList.remove('popup_active');
  });
};

/* Обработчик формы редактирования профиля */

function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  title.textContent = formNameInput.value;
  subtitle.textContent = formJobInput.value;
  
  closePopup(evt);
};

/* Слушатель событий формы заполнения профиля */

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

/* Обработчик формы добавления карточки */

function cardFormSubmitHandler (evt) {

  evt.preventDefault();
  
  addCardOnPage();

  closePopup(evt);
};

/* Слушатель событий формы карточки */

cardEditForm.addEventListener('submit', cardFormSubmitHandler);

/* Функция карточек "из коробки" */

initialCards.forEach(function(item){

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  
  newCard.querySelector('.card__image').src = item.link;
  newCard.querySelector('.card__image').alt = item.name;
  newCard.querySelector('.card__title').textContent = item.name;
  
  setCardListeners(newCard);

  cards.append(newCard);
});