import { Controller } from "../slider/MVC/Controller";
import { IOptions } from "../slider/MVC/Model";
import { NumericInput } from "./ControlsElements/NumericInput";
import { Toggle } from "./ControlsElements/Toggle";

interface IPanelOptions extends IOptions {
  sliderID: string;
}
class ControlsPanel {
  private slider: Controller;
  public element: HTMLElement;
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

  constructor(elem: HTMLElement, options: IPanelOptions) {
    this.createControls(elem, options);
  }
  createControls(elem: HTMLElement, options: IPanelOptions) {
    let sliderwrapper = document.createElement("div");
    sliderwrapper.className = "sliderWrapper";
    sliderwrapper.id = options.sliderID;
    elem.append(sliderwrapper);

    this.slider = $("#" + options.sliderID).ml_RangeSlider(options);

    this.element = document.createElement("div");
    this.element.className = "controlsWrapper";
    elem.append(this.element);

    this.toggleTips = new Toggle(this, "tips", this.slider.getHasTips());
    this.toggleRange = new Toggle(this, "range", this.slider.getRange());
    this.toggleScale = new Toggle(this, "scale", this.slider.getHasScale());
    this.toggleVertical = new Toggle(
      this,
      "vertical",
      this.slider.getVertical()
    );
    this.minValue = new NumericInput(this, "min", this.slider.getMinValue());
    this.maxValue = new NumericInput(this, "max", this.slider.getMaxValue());
    this.firstValue = new NumericInput(
      this,
      "first\n value",
      this.slider.getFirstValue()
    );
    this.secondValue = new NumericInput(
      this,
      "second\n value",
      this.slider.getSecondValue()
    );
    this.step = new NumericInput(this, "step", this.slider.getStep());
    this.maxScaleNumbersCount = new NumericInput(
      this,
      "max\nscale\nnumbers\ncount",
      this.slider.getMaxScaleNumbersCount()
    );
    this.addEventListeners();
  }

  addEventListeners() {
    this.toggleTips.input.onchange = () => {
      this.slider.setHasTips(Boolean(this.toggleTips.input.checked));
    };

    this.toggleRange.input.onchange = (e) => {
      this.slider.setRange(Boolean(this.toggleRange.input.checked));
    };

    this.toggleScale.input.onchange = (e) => {
      this.slider.setHasScale(Boolean(this.toggleScale.input.checked));
    };

    this.toggleVertical.input.onchange = (e) => {
      this.slider.setVertical(Boolean(this.toggleVertical.input.checked));
    };

    this.minValue.input.onchange = (e) =>
      this.slider.setMinValue(Number(this.minValue.input.value));

    this.maxValue.input.onchange = (e) => {
      this.slider.setMaxValue(Number(this.maxValue.input.value));
    };

    this.firstValue.input.onchange = (e) => {
      this.slider.setFirstValue(Number(this.firstValue.input.value));
    };

    this.secondValue.input.onchange = (e) => {
      this.slider.setSecondValue(Number(this.secondValue.input.value));
    };

    this.step.input.onchange = (e) => {
      this.slider.setStep(Number(this.step.input.value));
    };

    this.maxScaleNumbersCount.input.onchange = (e) => {
      this.slider.setMaxScaleNumbersCount(
        Number(this.maxScaleNumbersCount.input.value)
      );
    };

    this.slider.addEventListener((options) => {
      this.firstValue.input.value = options.firstValue;
    });
    this.slider.addEventListener((options) => {
      this.secondValue.input.value = options.secondValue;
    });
    this.slider.addEventListener((options) => {
      this.minValue.input.value = options.min;
    });
    this.slider.addEventListener((options) => {
      this.maxValue.input.value = options.max;
    });
    this.slider.addEventListener((options) => {
      this.step.input.value = options.step;
    });
    this.slider.addEventListener((options) => {
      this.maxScaleNumbersCount.input.value = options.maxScaleNumbersCount;
    });
  }
}
export { ControlsPanel };
