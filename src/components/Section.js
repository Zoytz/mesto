export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems(){
    this._items.forEach((item) => {
      this.renderer(item);
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