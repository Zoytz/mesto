
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
    this._formButton = formElement.querySelector(settings.formButton);
    this._formButtonDisabled = settings.formButtonDisabled;
    this._formElement = formElement;
    this._inputsList = formElement.querySelectorAll(this._formInput);
    
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
    });

  }

  _showError = (inputItem) => {
    this._errorItem = this._formElement.querySelector(`.${inputItem.id}-error`);
    this._errorItem.textContent = inputItem.validationMessage;
    this._errorItem.classList.add(this._errorSpanActive);
    inputItem.classList.add(this._formInputError);
  };

  _hideError = (inputItem) => {
    this._errorItem = this._formElement.querySelector(`.${inputItem.id}-error`);
    this._errorItem.textContent = '';
    this._errorItem.classList.remove(this._errorSpanActive);
    inputItem.classList.remove(this._formInputError);
  };

  _toggleButtonState = () => {
    this._isFormValid = this._formElement.checkValidity();
    if (this._isFormValid) {
      this._formButton.classList.remove(this._formButtonDisabled);
      this._formButton.disabled = false;
    } else {
      this._formButton.classList.add(this._formButtonDisabled);
      this._formButton.disabled = 'disabled';
    }
  }

  _checkInputValidity = (inputItem) => {
    this._isInputNotValid = !inputItem.validity.valid;
    if (this._isInputNotValid) {
      this._showError(inputItem);
    } else {
      this._hideError(inputItem);
    };
  };

  _setEventListeners = () => {
    this._inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputItem);
      });
    })

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  enableValidation() {
      this._setEventListeners();
  };
}