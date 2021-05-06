import { NumericInput } from "./ControlsElements/NumericInput";
import { Toggle } from "./ControlsElements/Toggle";

class ControlsPanel {
  constructor(elem, options) {
    this.createControls(elem, options);
  }
  createControls(elem, options) {
    let sliderwrapper = document.createElement("div");
    sliderwrapper.className = "sliderWrapper";
    sliderwrapper.id = options.sliderID;
    elem.append(sliderwrapper);
    this.slider = $("#" + options.sliderID).ML_RangeSlider(options);
    this.options = this.slider.getSliderOptions();

    this.element = document.createElement("div");
    this.element.className = "controlsWrapper";
    elem.append(this.element);

    this.toggleTips = new Toggle(this, "tips", this.options.hasTips);
    this.toggleTips.element.onchange = (e) =>
      this.slider.setHasTips(e.target.checked);

    this.toggleRange = new Toggle(this, "range", this.options.range);
    this.toggleRange.element.onchange = (e) => {
      this.slider.setRange(e.target.checked);
    };

    this.toggleScale = new Toggle(this, "scale", this.options.hasScale);
    this.toggleScale.element.onchange = (e) => {
      this.slider.setHasScale(e.target.checked);
    };

    this.toggleVertical = new Toggle(this, "vertical", this.options.vertical);
    this.toggleVertical.element.onchange = (e) => {
      this.slider.setVertical(e.target.checked);
    };

    this.minValue = new NumericInput(this, "min", this.options.min);
    this.minValue.element.onchange = (e) =>
      this.slider.setMinValue(e.target.value);

    this.maxValue = new NumericInput(this, "max", this.options.max);
    this.maxValue.element.onchange = (e) => {
      this.slider.setMaxValue(e.target.value);
    };

    this.firstValue = new NumericInput(
      this,
      "first\n value",
      this.options.firstValue
    );
    this.firstValue.element.onchange = (e) => {
      this.slider.setFirstValue(e.target.value);
    };

    this.secondValue = new NumericInput(
      this,
      "second\n value",
      this.options.secondValue
    );
    this.secondValue.element.onchange = (e) => {
      this.slider.setSecondValue(e.target.value);
    };

    this.step = new NumericInput(this, "step", this.options.step);
    this.step.element.onchange = (e) => {
      this.slider.setStep(e.target.value);
    };
    console.log(
      "this.options.maxScaleNumbersCount    " +
        this.options.maxScaleNumbersCount
    );
    this.maxScaleNumbersCount = new NumericInput(
      this,
      "max\nscale\nnumbers\ncount",
      this.options.maxScaleNumbersCount
    );
    this.maxScaleNumbersCount.element.onchange = (e) => {
      this.slider.setMaxScaleNumbersCount(e.target.value);
    };

    this.slider.addEventListener((options) => {
      this.firstValue.element.value = options.firstValue;
    });
    this.slider.addEventListener((options) => {
      this.secondValue.element.value = options.secondValue;
    });
    this.slider.addEventListener((options) => {
      this.minValue.element.value = options.min;
    });
    this.slider.addEventListener((options) => {
      this.maxValue.element.value = options.max;
    });
    this.slider.addEventListener((options) => {
      this.step.element.value = options.step;
    });
    this.slider.addEventListener((options) => {
      this.maxScaleNumbersCount.element.value = options.maxScaleNumbersCount;
    });
  }
}
export { ControlsPanel };
