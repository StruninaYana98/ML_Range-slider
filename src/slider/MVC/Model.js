import {
  FIRST_LOAD_OPTIONS,
  FIRST_VALUE_CHANGED,
  HAS_SCALE_CHANGED,
  HAS_TIPS_CHANGED,
  MAX_SCALE_NUMBERS_COUNT_CHANGED,
  MAX_VALUE_CHANGED,
  MIN_VALUE_CHANGED,
  MODEL_CHANGED,
  RANGE_CHANGED,
  SCALE_CLICK,
  SECOND_VALUE_CHANGED,
  STEP_CHANGED,
  VERTICAL_CHANGED,
} from "./actionTypes";
import { EventEmitter } from "./EventEmmiter";
const defaultOptions = {
  firstValue: 0,
  secondValue: 5,
  step: 1,
  range: true,
  hasScale: true,
  hasTips: true,
  vertical: true,
  min: 0,
  max: 10,
  maxScaleNumbersCount: 10,
};
class Model extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  validateOptions(options) {
    if (typeof options !== "object") {
      return defaultOptions;
    }
    let validOptions = { ...options };
    validOptions.range = !!validOptions.range;
    validOptions.hasScale = !!validOptions.hasScale;
    validOptions.hasTips = !!validOptions.hasTips;
    validOptions.vertical = !!validOptions.vertical;
    if (
      typeof validOptions.min !== "number" &&
      typeof validOptions.max !== "number"
    ) {
      validOptions.min = 0;
      validOptions.max =
        typeof validOptions.step === "number"
          ? validOptions.min + validOptions.step * 10
          : validOptions.min + 10;
    } else if (
      typeof validOptions.min !== "number" &&
      typeof validOptions.max === "number"
    ) {
      validOptions.min =
        typeof validOptions.step === "number"
          ? validOptions.max - validOptions.step * 10
          : validOptions.max - 10;
    } else if (
      typeof validOptions.min === "number" &&
      typeof validOptions.max !== "number"
    ) {
      validOptions.max =
        typeof validOptions.step === "number"
          ? validOptions.min + validOptions.step * 10
          : validOptions.min + 10;
    }
    if (validOptions.min > validOptions.max) {
      let val = validOptions.min;
      validOptions.min = validOptions.max;
      validOptions.max = val;
    }

    if (typeof validOptions.step !== "number") {
      validOptions.step = (validOptions.max - validOptions.min) / 10;
    }

    let stepValues = [];
    let i = validOptions.min;
    while (i < validOptions.max) {
      stepValues.push(i);
      i = i + validOptions.step;
    }
    stepValues.push(validOptions.max);

    validOptions.maxScaleNumbersCount =
      typeof validOptions.maxScaleNumbersCount !== "number"
        ? 10
        : validOptions.maxScaleNumbersCount < 2
        ? 2
        : Math.ceil(validOptions.maxScaleNumbersCount);

    let indexDiff = Math.ceil(
      stepValues.length / (validOptions.maxScaleNumbersCount - 1)
    );
    let scaleValues = [];
    let index = 0;
    while (index < stepValues.length - 1) {
      scaleValues.push(stepValues[index]);
      index = index + indexDiff;
    }
    scaleValues.push(stepValues[stepValues.length - 1]);

    validOptions.scaleValues = scaleValues;

    validOptions.firstValue =
      typeof validOptions.firstValue !== "number"
        ? validOptions.min
        : this.findClosestValue(validOptions.firstValue, stepValues);
    validOptions.secondValue =
      typeof validOptions.secondValue !== "number"
        ? validOptions.max
        : this.findClosestValue(validOptions.secondValue, stepValues);

    if (validOptions.firstValue > validOptions.secondValue) {
      let val = validOptions.firstValue;
      validOptions.firstValue = validOptions.secondValue;
      validOptions.secondValue = val;
    }
    if (!validOptions.range) {
      validOptions.firstValue = validOptions.min;
    }
    console.log(validOptions);
    return validOptions;
  }

  findClosestValue(value, array) {
    let diffArray = [];
    for (let item of array) {
      diffArray.push(Math.abs(item - value));
    }
    let min = Math.min(...diffArray);
    let minIndex = diffArray.findIndex((item) => item === min);
    return array[minIndex];
  }

  firstLoadOptions() {
    this.options = this.validateOptions(this.options);
    this.emit(FIRST_LOAD_OPTIONS, { ...this.options });
  }

  setMinValue(min) {
    this.eventHandler({ action: MIN_VALUE_CHANGED, payload: min });
  }
  getMinValue() {
    return this.options.min;
  }
  setMaxValue(max) {
    this.eventHandler({ action: MAX_VALUE_CHANGED, payload: max });
  }
  getMaxValue() {
    return this.options.max;
  }
  setFirstValue(value) {
    this.eventHandler({ action: FIRST_VALUE_CHANGED, payload: value });
  }
  getFirstValue() {
    return this.options.firstValue;
  }
  setSecondValue(value) {
    this.eventHandler({ action: SECOND_VALUE_CHANGED, payload: value });
  }
  getSecondValue() {
    return this.options.secondValue;
  }
  setHasTips(hasTips) {
    this.eventHandler({ action: HAS_TIPS_CHANGED, payload: hasTips });
  }
  getHasTips() {
    return this.options.hasTips;
  }
  setRange(range) {
    this.eventHandler({ action: RANGE_CHANGED, payload: range });
  }
  getRange() {
    return this.options.range;
  }
  setHasScale(hasScale) {
    this.eventHandler({ action: HAS_SCALE_CHANGED, payload: hasScale });
  }
  getHasScale() {
    return this.options.hasScale;
  }
  setVertical(vertical) {
    this.eventHandler({ action: VERTICAL_CHANGED, payload: vertical });
  }
  getVertical() {
    return this.options.vertical;
  }
  setStep(step) {
    this.eventHandler({ action: STEP_CHANGED, payload: step });
  }
  getStep() {
    return this.options.step;
  }
  setMaxScaleNumbersCount(count) {
    this.eventHandler({
      action: MAX_SCALE_NUMBERS_COUNT_CHANGED,
      payload: count,
    });
  }
  getMaxScaleNumbersCount() {
    return this.options.maxScaleNumbersCount;
  }
  eventHandler(event) {
    this.reducer(event.action, event.payload);
  }
  reducer(action, value) {
    let options = { ...this.options };
    switch (action) {
      case FIRST_VALUE_CHANGED:
        options.firstValue = Number(value);
        break;
      case SECOND_VALUE_CHANGED:
        options.secondValue = Number(value);
        break;
      case MIN_VALUE_CHANGED:
        options.min = Number(value);
        break;
      case MAX_VALUE_CHANGED:
        options.max = Number(value);
        break;
      case SCALE_CLICK:
        if (options.range) {
          if (
            Math.abs(Number(value) - options.firstValue) <
            Math.abs(Number(value) - options.secondValue)
          ) {
            options.firstValue = Number(value);
          } else {
            options.secondValue = Number(value);
          }
        } else {
          options.secondValue = Number(value);
        }
        break;
      case HAS_TIPS_CHANGED:
        options.hasTips = value;
        break;
      case RANGE_CHANGED:
        options.range = value;
        break;
      case HAS_SCALE_CHANGED:
        options.hasScale = value;
        break;
      case VERTICAL_CHANGED:
        options.vertical = value;
        break;
      case STEP_CHANGED:
        options.step = Number(value);
        break;
      case MAX_SCALE_NUMBERS_COUNT_CHANGED:
        options.maxScaleNumbersCount = Number(value);
        break;
    }
    this.options = this.validateOptions(options);
    this.emit(MODEL_CHANGED, { ...this.options });
  }
}
export { Model };
