import { EventEmitter } from "./EventEmmiter";

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  loadFirstData() {
    this.emit("loadFirstData", { ...this.options });
  }
  firstButtonMoved(value) {
    if (
      this.options.firstValue + value <= this.options.secondValue &&
      this.options.firstValue + value >= this.options.min
    ) {
      this.options.firstValue = this.options.firstValue + value;
    }
    this.emit("modelChanged", { ...this.options });
  }
  secondButtonMoved(value) {
    if (
      this.options.secondValue + value >= this.options.firstValue &&
      this.options.secondValue + value <= this.options.max
    ) {
      this.options.secondValue = this.options.secondValue + value;
    }
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
    this.emit("modelChanged", { ...this.options });
  }
  setMinValue(min) {
    this.options.min = Number(min);
    this.emit("modelChanged", { ...this.options });
  }
  setHasTips(hasTips) {
    this.options.hasTips = hasTips;
    this.emit("modelChanged", { ...this.options });
  }
  setRange(range) {
    this.options.range = range;
    if (!range) {
      this.options.firstValue = this.options.min;
    }
    this.emit("modelChanged", { ...this.options });
  }
  setHasScale(hasScale) {
    this.options.hasScale = hasScale;
    this.emit("modelChanged", { ...this.options });
  }
  setVertical(vertical) {
    this.options.vertical = vertical;
    this.emit("modelChanged", { ...this.options });
  }
}
export { Model };
