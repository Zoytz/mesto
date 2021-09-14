let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.form__close-btn');

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

let formNameInput = document.querySelector('.form__input_type_name');
let formJobInput = document.querySelector('.form__input_type_job');

let formElement = document.querySelector('.form');

function addInputValue () {
  formNameInput.value = title.textContent;
  formJobInput.value = subtitle.textContent;
};

function closePopup () {
  popup.classList.remove('popup_active');
};

function openPopup () {
  popup.classList.add('popup_active');
  addInputValue();
};

editButton.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
  evt.preventDefault();

  title.textContent = formNameInput.value;
  subtitle.textContent = formJobInput.value;
  
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
