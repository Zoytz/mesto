import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputsList = Array.from(this._form.querySelectorAll('.form__input'));
    
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
}