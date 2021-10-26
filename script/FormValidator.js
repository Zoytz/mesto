
export const validationSettings = {
  form: '.form',
  formInput: '.form__input',
  formInputError: 'form__input_type_error',
  errorSpanActive: 'form__input-error_active',
  formButton: '.form__button',
  formButtonDisabled: 'form__button_disabled',
};

export class FormValidator {
  constructor(settings, formElement) {
    this._form = settings.form;
    this._formInput = settings.formInput;
    this._formInputError = settings.formInputError;
    this._errorSpanActive = settings.errorSpanActive;
    this._formButton = settings.formButton;
    this._formButtonDisabled = settings.formButtonDisabled;
    this._formElement = formElement;
  }

  _showError = (errorItem, inputItem) => {
    errorItem.textContent = inputItem.validationMessage;
    errorItem.classList.add(this._errorSpanActive);
    inputItem.classList.add(this._formInputError);
  };

  _hideError = (errorItem, inputItem) => {
    errorItem.textContent = '';
    errorItem.classList.remove(this._errorSpanActive);
    inputItem.classList.remove(this._formInputError);
  };

  _toggleButtonState = (button, isValid) => {
    if (isValid) {
      button.classList.remove(this._formButtonDisabled);
      button.disabled = false;
    } else {
      button.classList.add(this._formButtonDisabled);
      button.disabled = 'disabled';
    }
  }

  _checkInputValidity = (formItem, inputItem) => {
    const isInputNotValid = !inputItem.validity.valid;
    const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
    if (isInputNotValid) {
      this._showError(errorItem, inputItem);
    } else {
      this._hideError(errorItem, inputItem);
    };
  };

  _setEventListeners = (formItem) => {
    const buttonElement = formItem.querySelector(this._formButton);
    const inputsList = Array.from(formItem.querySelectorAll(this._formInput));
    inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        const isFormValid = formItem.checkValidity();
        this._toggleButtonState(buttonElement, isFormValid);
        this._checkInputValidity(formItem, inputItem);
      });
    })

    formItem.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  enableValidation() {
      this._setEventListeners(this._formElement);
  };
}