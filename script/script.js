let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.form__close-btn');

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

let formNameInput = document.querySelector('.form__name-input');
let formJobInput = document.querySelector('.form__job-input');

let profileTitle = document.querySelector('.profile__title').textContent;
let profileSubtitle = document.querySelector('.profile__subtitle').textContent;

let formElement = document.querySelector('.form');

function addInputValue () {
  formNameInput.setAttribute('value',`${profileTitle}`);
  formJobInput.setAttribute('value',`${profileSubtitle}`);
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
  
  let nameInputValue = formNameInput.value;
  let jobInputValue = formJobInput.value;

  title.textContent = nameInputValue;
  subtitle.textContent = jobInputValue;
  
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
