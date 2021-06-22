import { Controller } from "../slider/MVC/Controller";
import { IOptions } from "../slider/MVC/Model";
import { NumericInput } from "./ControlsElements/numericInput/NumericInput";
import { Toggle } from "./ControlsElements/toggle/Toggle";

interface IPanelOptions extends IOptions {
  sliderID: string;
}
class ControlsPanel {
  private slider: Controller;
  private toggleTips: Toggle;
  private toggleRange: Toggle;
  private toggleScale: Toggle;
  private toggleVertical: Toggle;
  private minValue: NumericInput;
  private maxValue: NumericInput;
  private firstValue: NumericInput;
  private secondValue: NumericInput;
  private step: NumericInput;
  private maxScaleNumbersCount: NumericInput;

  constructor(elem: JQuery<HTMLElement>, options: IPanelOptions) {
    this.createControls(elem, options);
  }
  createControls(elem: JQuery<HTMLElement>, options: IPanelOptions) {
    this.slider = elem.find(".js-slider").ml_RangeSlider(options);
    this.toggleTips = new Toggle(elem, ".js-tips", this.slider.getHasTips());
    this.toggleRange = new Toggle(elem, ".js-range", this.slider.getRange());
    this.toggleScale = new Toggle(elem, ".js-scale", this.slider.getHasScale());
    this.toggleVertical = new Toggle(
      elem,
      ".js-vertical",
      this.slider.getVertical()
    );
    this.minValue = new NumericInput(elem, ".js-min", this.slider.getMinValue());
    this.maxValue = new NumericInput(elem, ".js-max", this.slider.getMaxValue());
    this.firstValue = new NumericInput(
      elem,
      ".js-first-value",
      this.slider.getFirstValue()
    );
    this.secondValue = new NumericInput(
      elem,
      ".js-second-value",
      this.slider.getSecondValue()
    );
    this.step = new NumericInput(elem, ".js-step", this.slider.getStep());
    this.maxScaleNumbersCount = new NumericInput(
      elem,
      ".js-max-scale-numbers-count",
      this.slider.getMaxScaleNumbersCount()
    );
    this.addEventListeners();
  }

  addEventListeners() {
    this.toggleTips.input.on("change", () => {
      this.slider.setHasTips(Boolean(this.toggleTips.input.prop("checked")));
    });

    this.toggleRange.input.on("change", (e) => {
      this.slider.setRange(Boolean(this.toggleRange.input.prop("checked")));
    });

    this.toggleScale.input.on("change", (e) => {
      this.slider.setHasScale(Boolean(this.toggleScale.input.prop("checked")));
    });

    this.toggleVertical.input.on("change", (e) => {
      this.slider.setVertical(
        Boolean(this.toggleVertical.input.prop("checked"))
      );
    });

    this.minValue.input.on("change", () =>
      this.slider.setMinValue(Number(this.minValue.input.prop("value")))
    );

    this.maxValue.input.on("change", () => {
      this.slider.setMaxValue(Number(this.maxValue.input.prop("value")));
    });

    this.firstValue.input.on("change", () => {
      this.slider.setFirstValue(Number(this.firstValue.input.prop("value")));
    });

    this.secondValue.input.on("change", () => {
      this.slider.setSecondValue(Number(this.secondValue.input.prop("value")));
    });

    this.step.input.on("change", () => {
      this.slider.setStep(Number(this.step.input.prop("value")));
    });

    this.maxScaleNumbersCount.input.on("change", () => {
      this.slider.setMaxScaleNumbersCount(
        Number(this.maxScaleNumbersCount.input.prop("value"))
      );
    });

    this.slider.addEventListener((options) => {
      this.firstValue.input.prop("value",options.firstValue ) ;
    });
    this.slider.addEventListener((options) => {
      this.secondValue.input.prop("value" , options.secondValue);
    });
    this.slider.addEventListener((options) => {
      this.minValue.input.prop("value", options.min);
    });
    this.slider.addEventListener((options) => {
      this.maxValue.input.prop("value", options.max);
    });
    this.slider.addEventListener((options) => {
      this.step.input.prop("value", options.step);
    });
    this.slider.addEventListener((options) => {
      this.maxScaleNumbersCount.input.prop("value", options.maxScaleNumbersCount);
    });
  }
}
export { ControlsPanel };
