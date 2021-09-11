let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.form__close-btn');

function popupDisabled () {
  popup.classList.remove('popup_active');
}

function popupActive () {
  popup.classList.add('popup_active');
};

editButton.addEventListener('click', popupActive);
closeBtn.addEventListener('click', popupDisabled);

let profileTitle = document.querySelector('.profile__title').textContent;
let profileSubtitle = document.querySelector('.profile__subtitle').textContent;
let formNameInput = document.querySelector('.form__name-input');
let formJobInput = document.querySelector('.form__job-input');

formNameInput.setAttribute('value', `${profileTitle}`);
formJobInput.setAttribute('value',`${profileSubtitle}`);

let formElement = document.querySelector('.form');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  let NameInputValue = formNameInput.value;
  let JobInputValue = formJobInput.value;

  let title = document.querySelector('.profile__title');
  let subtitle = document.querySelector('.profile__subtitle');

  title.textContent = `${NameInputValue}`;
  subtitle.textContent = `${JobInputValue}`;
  
  popupDisabled();
}

formElement.addEventListener('submit', formSubmitHandler);
