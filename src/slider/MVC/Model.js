import { EventEmitter } from "./EventEmmiter";

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  loadFirstData() {
    return this.options;
  }
  buttonMoved(options) {
    for (let key in options) {
      if (
        this.options[key] + options[key] * this.options.step >
        this.options.max
      ) {
        // this.options[key] = this.options.max;
      } else if (
        this.options[key] + options[key] * this.options.step <
        this.options.min
      ) {
        // this.options[key] = this.options.min;
      } else {
        this.options[key] =
          this.options[key] + options[key] * this.options.step;
      }
    }
    console.log("options");
    console.log({ ...this.options });
    this.emit("modelChanged", { ...this.options });
  }
  scaleClick(number) {
    if (this.options.range) {
      if (
        Math.abs(number - this.options.currLeft) <
        Math.abs(number - this.options.currRight)
      ) {
        this.options.currLeft = Number(number);
      } else {
        this.options.currRight = Number(number);
      }
    } else {
      this.options.currRight = Number(number);
    }
    this.emit("modelChanged", { ...this.options });
  }
  setMinValue(min) {
    this.options.min = Number(min);
    this.emit("modelChanged", { ...this.options });
  }
  setHasIndicator(hasIndicator) {
    this.options.hasIndicator = hasIndicator;
    this.emit("modelChanged", { ...this.options });
  }
  setRange(range) {
    this.options.range = range;
    if (!range) {
      this.options.currLeft = this.options.min;
    }
    this.emit("modelChanged", { ...this.options });
  }
  setScale(hasScale) {
    this.options.hasScale = hasScale;
    this.emit("modelChanged", { ...this.options });
  }
  setVertical(vertical) {
    this.options.vertical = vertical;
    this.emit("modelChanged", { ...this.options });
  }
}
export { Model };
