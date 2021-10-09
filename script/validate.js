const validationSettings = {
  form:'.form',
  formInput:'.form__input',
  formInputError:'form__input_type_error',
  errorSpanActive:'form__input-error_active',
  formButton:'.form__button',
  formButtonDisabled:'form__button_disabled',
};

const showError = (errorItem, inputItem, settings) => {
  errorItem.textContent = inputItem.validationMessage;
  errorItem.classList.add(settings.errorSpanActive);
  inputItem.classList.add(settings.formInputError);
};

const hideError = (errorItem, inputItem, settings) => {
  errorItem.textContent = '';
  errorItem.classList.remove(settings.errorSpanActive);
  inputItem.classList.remove(settings.formInputError);
};

const checkInputValidity = (formItem, inputItem, settings) => {
  const isInputNotValid = !inputItem.validity.valid;
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  if (isInputNotValid){
    showError(errorItem, inputItem, settings);
  } else {
    hideError(errorItem, inputItem, settings);
  };
};

const toggleButtonState = (button, isValid, settings) => {
  if(isValid) {
    button.classList.remove(settings.formButtonDisabled);
    button.disabled = false;
  } else {
    button.classList.add(settings.formButtonDisabled);
    button.disabled = 'disabled';
  }
}

const setEventListeners = (formItem, settings) => {
  const buttonElement = formItem.querySelector(settings.formButton);
  const inputsList = Array.from(formItem.querySelectorAll(settings.formInput));
  inputsList.forEach(function(inputItem){
    inputItem.addEventListener('input', function (){
      const isFormValid = formItem.checkValidity();
      toggleButtonState(buttonElement, isFormValid, settings);
      checkInputValidity(formItem, inputItem, settings);

    });
  })

  formItem.addEventListener('submit', function (evt){
    evt.preventDefault();
  });

}

const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.form));
  formsList.forEach(function(formItem){
    setEventListeners(formItem, settings);
  });
};

enableValidation(validationSettings);








