export default class UserInfo {
  constructor(nameSelector, jobSelector){
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._title = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo(){
    this._userData = {};
    this._userData.name = this._title.textContent;
    
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(data){
    this._title.textContent = data.name;
    this._job.textContent = data.job;
  }
}