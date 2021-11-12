export default class UserInfo {
  constructor(nameSelector, jobSelector){
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._title = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo(){
    this._userData = {};
    this._userData.name = document.querySelector(this._nameSelector).textContent;
    
    this._userData.job = document.querySelector(this._jobSelector).textContent;
    return this._userData;
  }

  setUserInfo(name, job){
    this._title.textContent = name;
    this._job.textContent = job;
  }
}