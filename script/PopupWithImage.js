import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__title');
  }

  open(link, name){
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupText.textContent = name;
    super.open();
  }
}