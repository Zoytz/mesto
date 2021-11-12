export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this.renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  rendererItems(){
    this._items.forEach((item) => {
      this.renderer(item);
    })
  }

  addItem(element, boolean){
    if(boolean){
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
  }
  }
}