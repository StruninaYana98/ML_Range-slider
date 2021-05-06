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
};
class Model extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  validateOptions(options) {
    if (!options) {
      return defaultOptions;
    }
    let validOptions = { ...options };

    if (
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

    console.log(stepValues);

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

    console.log(scaleValues);
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
    console.log(validOptions);
    return validOptions;
  }

  findClosestValue(value, array) {
    let diffArray = [];
    for (let item of array) {
      diffArray.push(Math.abs(item - value));
    }
    console.log(diffArray);
    let min = Math.min(...diffArray);
    console.log(min);
    let minIndex = diffArray.findIndex((item) => item === min);
    console.log(array[minIndex]);
    return array[minIndex];
  }
  loadFirstData() {
    this.options = this.validateOptions(this.options);
    this.emit("loadFirstData", { ...this.options });
  }
  firstButtonMoved(value) {
    this.options.firstValue = this.options.firstValue + value;

    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  secondButtonMoved(value) {
    this.options.secondValue = this.options.secondValue + value;

    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }

  scaleClick(number) {
    if (this.options.range) {
      if (
        Math.abs(number - this.options.firstValue) <
        Math.abs(number - this.options.secondValue)
      ) {
        this.options.firstValue = Number(number);
      } else {
        this.options.secondValue = Number(number);
      }
    } else {
      this.options.secondValue = Number(number);
    }
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setMinValue(min) {
    this.options.min = Number(min);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setMaxValue(max) {
    this.options.max = Number(max);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setFirstValue(value) {
    this.options.firstValue = Number(value);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setSecondValue(value) {
    this.options.secondValue = Number(value);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setHasTips(hasTips) {
    this.options.hasTips = hasTips;
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setRange(range) {
    this.options.range = range;
    if (!range) {
      this.options.firstValue = this.options.min;
    }
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setHasScale(hasScale) {
    this.options.hasScale = hasScale;
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setVertical(vertical) {
    this.options.vertical = vertical;
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setStep(step) {
    this.options.step = Number(step);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
  setMaxScaleNumbersCount(count) {
    this.options.maxScaleNumbersCount = Number(count);
    this.options = this.validateOptions(this.options);
    this.emit("modelChanged", { ...this.options });
  }
}
export { Model };
