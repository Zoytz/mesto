import PopupWithForm from '../components/PopupWithForm.js'

export default class PopupWithConfirm extends PopupWithForm {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._cardId, this._card);
      super.setEventListeners();
    })
  }
}