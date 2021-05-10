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
    this.model.firstLoadOptions();
  }
  getSliderOptions() {
    return this.model.options;
  }
  setMinValue(min) {
    this.model.setMinValue(min);
  }
  getMinValue() {
    return this.model.getMinValue();
  }
  setMaxValue(max) {
    this.model.setMaxValue(max);
  }
  getMaxValue() {
    return this.model.getMaxValue();
  }
  setFirstValue(value) {
    this.model.setFirstValue(value);
  }
  getFirstValue() {
    return this.model.getFirstValue();
  }
  setSecondValue(value) {
    this.model.setSecondValue(value);
  }
  getSecondValue() {
    return this.model.getSecondValue();
  }
  setHasTips(hasTips) {
    this.model.setHasTips(hasTips);
  }
  getHasTips() {
    return this.model.getHasTips();
  }
  setRange(range) {
    this.model.setRange(range);
  }
  getRange() {
    return this.model.getRange();
  }
  setHasScale(hasScale) {
    this.model.setHasScale(hasScale);
  }
  getHasScale() {
    return this.model.getHasScale();
  }
  setVertical(vertical) {
    this.model.setVertical(vertical);
  }
  getVertical() {
    return this.model.getVertical();
  }
  setStep(step) {
    this.model.setStep(step);
  }
  getStep() {
    return this.model.getStep();
  }
  setMaxScaleNumbersCount(count) {
    this.model.setMaxScaleNumbersCount(count);
  }
  getMaxScaleNumbersCount() {
    return this.model.getMaxScaleNumbersCount();
  }
  addEventListener(eventHandler) {
    this.model.on(MODEL_CHANGED, (options) => eventHandler(options));
  }
}
export { Controller };
