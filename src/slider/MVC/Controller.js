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
  getSliderOptions() {
    return this.model.options;
  }
  setMinValue(min) {
    this.model.setMinValue(min);
  }
  setMaxValue(max) {
    this.model.setMaxValue(max);
  }
  setFirstValue(value) {
    this.model.setFirstValue(value);
  }
  setSecondValue(value) {
    this.model.setSecondValue(value);
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
  setStep(step) {
    this.model.setStep(step);
  }
  setMaxScaleNumbersCount(count) {
    this.model.setMaxScaleNumbersCount(count);
  }
  addEventListener(eventHandler) {
    this.model.on("modelChanged", (options) => eventHandler(options));
  }
}
export { Controller };
