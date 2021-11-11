export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open(){
    this.setEventListeners();
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose)
  };

  close(){
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose)
  };

  _handleEscClose(evt){
    if (evt.key !== 'Escape') {
      return
    } else {
      this.close();
    };
  }

  setEventListeners(){
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        this.close()}});
    this._closeBtn.addEventListener('click', () => this.close());
  }
}