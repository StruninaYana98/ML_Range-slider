import { EventEmitter } from "./EventEmmiter";

class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    this.view.on("buttonMoved", (pos) => this.model.buttonMoved(pos));
    this.model.on("modelChanged", (options) => this.view.rerender(options));
    this.view.on("scaleClick", (number) => this.model.scaleClick(number));
  }
  setMinValue(min) {
    this.model.setMinValue(min);
  }
  setHasIndicator(hasIndicator) {
    this.model.setHasIndicator(hasIndicator);
  }
  setRange(range) {
    this.model.setRange(range);
  }
  setScale(hasScale) {
    this.model.setScale(hasScale);
  }
  setVertical(vertical) {
    this.model.setVertical(vertical);
  }
}
export { Controller };
