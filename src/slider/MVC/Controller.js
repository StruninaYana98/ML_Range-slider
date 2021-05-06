import { EventEmitter } from "./EventEmmiter";

class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    this.model.on("loadFirstData", (options) =>
      this.view.createSlider(options)
    );
    this.view.on("firstButtonMoved", (pos) => this.model.firstButtonMoved(pos));
    this.view.on("secondButtonMoved", (pos) =>
      this.model.secondButtonMoved(pos)
    );
    this.model.on("modelChanged", (options) => this.view.rerender(options));
    this.view.on("scaleClick", (number) => this.model.scaleClick(number));
    this.model.loadFirstData();
  }
  setMinValue(min) {
    this.model.setMinValue(min);
  }
  setHasTips(hasTips) {
    this.model.setHasTips(hasTips);
  }
  setRange(range) {
    this.model.setRange(range);
  }
  setHasScale(hasScale) {
    this.model.setHasScale(hasScale);
  }
  setVertical(vertical) {
    this.model.setVertical(vertical);
  }
}
export { Controller };
