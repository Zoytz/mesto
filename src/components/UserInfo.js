export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector){
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._avatar = document.querySelector(avatarSelector);
    this._title = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo(){
    this._userData = {};
    this._userData.name = this._title.textContent;
    this._userData.job = this._job.textContent;
    // this._userData.avatar = this._avatar.src;
    return this._userData;
  }

  setUserInfo(data){
    this._title.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}