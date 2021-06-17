import { SCALE_CLICK } from "../../actionTypes";
import { View } from "../View";
import { Subview } from "./Subview";

class Scale extends Subview {
  private view: View;
  private scaleElements: Array<JQuery<HTMLElement>>;

  constructor(view: View) {
    super();
    this.view = view;
    this.createScale();
  }
  public createScale() {
    this.render();
  }
  public render() {
    const { hasScale, vertical, scaleValues, min, max } = this.view.options;

    this.view.slider.element.find(".slider_scaleElement").remove();

    this.scaleElements = [];
    if (hasScale) {
      let sliderWidth = this.getElementWidth(
        this.view.slider.element.get(0),
        vertical
      );
      let sliderHeight = this.getElementHeight(
        this.view.slider.element.get(0),
        vertical
      );
      scaleValues.forEach((number) => {
        let scaleElem = $(
          `<div class="slider_scaleElement">${String(number)}</div>`
        );
        this.view.slider.element.append(scaleElem);

        let scaleElemSliderGap = `${20 + sliderHeight}px`;
        scaleElem.css(vertical ? "left" : "top", scaleElemSliderGap);

        let scaleElemWidth = this.getElementWidth(scaleElem.get(0), vertical);
        let scaleElemPosition = `${String(
          (sliderWidth * (number - min)) / (max - min) - scaleElemWidth / 2
        )}px`;
        scaleElem.css(vertical ? "bottom" : "left", scaleElemPosition);
        this.scaleElements.push(scaleElem);
      });
      this.addEventListeners(this.scaleElements);
    }
  }
  addEventListeners(scale: Array<JQuery<HTMLElement>>) {
    for (let scaleNumber of scale) {
      scaleNumber.on("click", (e) => this.onsScaleClick(scaleNumber.text()));
    }
  }
  onsScaleClick(value: string) {
    this.emit(SCALE_CLICK, value);
  }
}
export { Scale };
