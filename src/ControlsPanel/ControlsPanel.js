import { NumericInput } from "./ControlsElements/NumericInput";
import { Toggle } from "./ControlsElements/Toggle";

class ControlsPanel {
  constructor(elem, options) {
    this.options = options;
    this.createControls(elem, options);
  }
  createControls(elem, options) {
    let sliderwrapper = document.createElement("div");
    sliderwrapper.className = "sliderWrapper";
    sliderwrapper.id = options.sliderID;
    elem.append(sliderwrapper);
    this.slider = $("#" + options.sliderID).ML_RangeSlider(options);

    this.element = document.createElement("div");
    this.element.className = "controlsWrapper";
    elem.append(this.element);

    this.toggleIndicator = new Toggle(
      this,
      "indicators",
      this.options.hasIndicator
    );
    this.toggleIndicator.element.onchange = (e) =>
      this.slider.setHasIndicator(e.target.checked);

    this.toggleRange = new Toggle(this, "range", this.options.range);
    this.toggleRange.element.onchange = (e) => {
      this.slider.setRange(e.target.checked);
    };

    this.toggleScale = new Toggle(this, "scale", this.options.hasScale);
    this.toggleScale.element.onchange = (e) => {
      this.slider.setScale(e.target.checked);
    };

    this.toggleVertical = new Toggle(this, "vertical", this.options.vertical);
    this.toggleVertical.element.onchange = (e) => {
      this.slider.setVertical(e.target.checked);
    };

    this.minValue = new NumericInput(this, "min", this.options.min);
    this.minValue.element.onchange = (e) =>
      this.slider.setMinValue(e.target.value);
  }
}
export { ControlsPanel };
