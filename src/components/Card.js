

export class Card {

  constructor(dataLink, dataText, cardTemplate, handleCardClick) {
    this._dataLink = dataLink;
    this._dataText = dataText;
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    this._card = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._dataLink;
    this._cardImage.alt = this._dataText;
    this._card.querySelector('.card__title').textContent = this._dataText;

    this._setListenersOnCard();

    return this._card;
  }

  _setListenersOnCard() {
    const cardDelButton = this._card.querySelector('.card__del-btn');
    cardDelButton.addEventListener('click', () => {
      this._card.remove();
    });
    
      this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._dataLink, this._dataText);
    });
    const cardLikeBtn = this._card.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', function () {
      cardLikeBtn.classList.toggle('card__like_active');
    });
  }

}
