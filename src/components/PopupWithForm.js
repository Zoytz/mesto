import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputsList = Array.from(this._form.querySelectorAll('.form__input'));
    this._formBtn = this._form.querySelector('.form__button');
  }

  _getInputValues(){
    this._inputsData = {};
    this._inputsList.forEach((inputElement) =>{
      this._inputsData[inputElement.name] = inputElement.value;
    })
    return this._inputsData;
  }

  setEventListeners(){
    this._form.addEventListener('submit', () => this._submitCallback(this._getInputValues()));
    super.setEventListeners();
  }

  close(){
    super.close();
    this._form.reset();
  }

  renderLoading(boolean){
    if(boolean){
      this._formBtn.textContent = 'Сохранение...';
    } else {
      this._formBtn.textContent = this._formBtn.value;
    }
  }
}