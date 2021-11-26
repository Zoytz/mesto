

export class Card {

  constructor(data, cardTemplate, handleCardClick, userData, api, handleDelBtnClick) {
    this._handleDelBtnClick = handleDelBtnClick;
    this._api = api;
    this._userData = userData;
    this._dataLink = data.link;
    this._dataText = data.name;
    this._data = data;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._handleCardClick = handleCardClick;
    this._hasMyLike = this._hasMyLike.bind(this)
  }

  createCard() {
    this._card = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._dataLink;
    this._cardImage.alt = this._dataText;
    this._card.querySelector('.card__title').textContent = this._dataText;
    this._likesCounter = this._card.querySelector('.card__like-counter');
    this._likesCounter.textContent = this._likes.length;
    this._delBtn = this._card.querySelector('.card__del-btn');
    this._cardLikeBtn = this._card.querySelector('.card__like');


    this._setDefaultLikes(this._hasMyLike());
    this._isCardMy();
    this._setListenersOnCard();
    
    
    return this._card;
  }

  _setListenersOnCard() {
    const cardDelButton = this._card.querySelector('.card__del-btn');
    cardDelButton.addEventListener('click', () => {
      this._handleDelBtnClick(this._cardId, this._card);
      // .then((res) => this._card.remove())
      // .catch(err => console.log('_setListenersOnCard', err));
    });
      this._cardLikeBtn.addEventListener('click', () => {this._setLike(this._hasMyLike())})
      this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._dataLink, this._dataText);
    });
    
  }

  _isCardMy(){
    if(this._data.owner._id === this._userData._id) {
      return
    } else {
      this._delBtn.classList.add('card__del-btn_disabled');
    }
  }

  _hasMyLike(){
    return this._likes.some(user => user._id === this._userData._id)
  }

  _setDefaultLikes(boolean) {
    if(boolean) {
      this._cardLikeBtn.classList.add('card__like_active');
    } else {
      this._cardLikeBtn.classList.remove('card__like_active');
    }
  }

  _setLike(boolean) {
    if(boolean) {
      this._api.delLikeCard(this._cardId)
      .then((res) => {return this._likes = res.likes})
      .then((res) => {this._likesCounter.textContent = res.length;})
      .then((res) => {this._cardLikeBtn.classList.remove('card__like_active')})
      .catch(err => console.log(err, res));
    } else {
      this._api.setLikeCard(this._cardId)
      .then((res) => {return this._likes = res.likes})
      .then((res) => {this._likesCounter.textContent = res.length;})
      .then((res) => {this._cardLikeBtn.classList.add('card__like_active')})
      .catch(err => console.log(err, res));
    }
  }

}
