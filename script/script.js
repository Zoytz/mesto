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
const cardNameInput = document.querySelector('.form__input_type_place-name');
const cardImageInput = document.querySelector('.form__input_type_place-image');

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
  openPopup (popupTypeText);
  addInputValue ();
});

/* Кнопка добавления карточки */

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function(){
  openPopup (popupTypeCard);
});

/* Закрытие попапов */

document.body.addEventListener('click', (evt) => {
  const activePopup = evt.target.closest('.popup_active');
  if (!activePopup){
    return;
  };
  if (evt.target.classList.contains('popup__close-btn')){
    closePopup (activePopup);
  };
});

/* Функция добавления карточек на страницу */

function createCard(dataText, dataImage) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  
  newCard.querySelector('.card__image').src = dataImage;
  newCard.querySelector('.card__image').alt = dataText;
  newCard.querySelector('.card__title').textContent = dataText;
  
  setCardListeners(newCard);
  return newCard;
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
    openPopup(popupTypeImage);
    });
    const likeBtn =  card.querySelector('.card__like')
    likeBtn.addEventListener('click', function(evt){
      likeBtn.classList.toggle('card__like_active');
    }); 
};

/* Функция заполнения ипутов формы профиля */

function addInputValue () {
  formNameInput.value = title.textContent;
  formJobInput.value = subtitle.textContent;
};

/* Функция закрытия попапов */

function closePopup (popup) {
  popup.classList.remove('popup_active');
};

/* Функция открытия попапов */

function openPopup (popup) {
  popup.classList.add('popup_active');
};

/* Обработчик формы редактирования профиля */

function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  title.textContent = formNameInput.value;
  subtitle.textContent = formJobInput.value;
  
  closePopup(evt.target.closest('.popup'));
};

/* Слушатель событий формы заполнения профиля */

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

/* Обработчик формы добавления карточки */

function cardFormSubmitHandler (evt) {

  evt.preventDefault();
  
  const newCard = createCard(cardNameInput.value, cardImageInput.value);
  cards.prepend(newCard);
  cardNameInput.value = null;
  cardImageInput.value = null;
};

/* Слушатель событий формы карточки */

cardEditForm.addEventListener('submit', cardFormSubmitHandler);

/* Функция карточек "из коробки" */

initialCards.forEach(function(item){

  const newCard = createCard(item.name, item.link);
  cards.append(newCard);

});