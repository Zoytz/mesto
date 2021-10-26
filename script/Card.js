

import {popupImage, popupTitle, popupTypeImage, openPopup} from './script.js';

export class Card {

  constructor(dataLink, dataText, cardTemplate) {
    this._dataLink = dataLink;
    this._dataText = dataText;
    this._cardTemplate = document.querySelector(cardTemplate).content;
  }

  _setListenersOnCard(card) {
    /* Слушатель на кнопку удаления */
    const cardDelButton = card.querySelector('.card__del-btn');
    cardDelButton.addEventListener('click', function () {
      card.remove();
    });
    /* Слушатель на изображение */
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    cardImage.addEventListener('click', () => {
      popupImage.setAttribute('src', cardImage.src);
      popupImage.setAttribute('alt', cardTitle.textContent);
      popupTitle.textContent = cardTitle.textContent;
      openPopup(popupTypeImage);
    });
    /* Слушатель на лайкусик */
    const cardLikeBtn = card.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', function () {
      cardLikeBtn.classList.toggle('card__like_active');
    });
  }

  createCard() {
    const card = this._cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = this._dataLink;
    card.querySelector('.card__image').alt = this._dataText;
    card.querySelector('.card__title').textContent = this._dataText;

    this._setListenersOnCard(card);

    return card;
  }
}
