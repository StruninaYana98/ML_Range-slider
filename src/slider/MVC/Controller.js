import { FIRST_LOAD_OPTIONS, MODEL_CHANGED, VIEW_CHANGED } from "./actionTypes";
import { EventEmitter } from "./EventEmmiter";

class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    this.model.on(FIRST_LOAD_OPTIONS, (options) =>
      this.view.createSlider(options)
    );
    this.view.on(VIEW_CHANGED, (event) => this.model.eventHandler(event));
    this.model.on(MODEL_CHANGED, (options) => this.view.rerender(options));
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
    this.model.on(MODEL_CHANGED, (options) => eventHandler(options));
  }
}
export { Controller };
