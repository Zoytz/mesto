export default class Section {
  constructor({renderer}, containerSelector){
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems(items){
    items.forEach((item) => {
      this.addItem(this.renderer(item), true);
    })
  }

  addItem(element, boolean){
    if(boolean){
      this._container.append(element);
    } else {
      this._container.prepend(element);
  }
  }
}