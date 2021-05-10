import { SCALE_CLICK } from "../../actionTypes";
import { Subview } from "./Subview";

class Scale extends Subview {
  constructor(view) {
    super();
    this.view = view;
    this.createScale();
  }
  createScale() {
    this.scaleElements = [];
    this.render();
  }
  render() {
    const { hasScale, vertical, scaleValues, min, max } = this.view.options;
    for (let item of this.scaleElements) {
      this.view.slider.element.removeChild(item);
    }
    this.scaleElements = [];
    if (hasScale) {
      let sliderWidth = this.getElementWidth(
        this.view.slider.element,
        vertical
      );
      let sliderHeight = this.getElementHeight(
        this.view.slider.element,
        vertical
      );
      for (let number of scaleValues) {
        let scaleElem = document.createElement("div");
        scaleElem.innerText = number;
        this.view.slider.element.append(scaleElem);
        scaleElem.style.position = "absolute";
        let scaleElemSliderGap = `${20 + sliderHeight}px`;
        if (vertical) {
          scaleElem.style.left = scaleElemSliderGap;
        } else {
          scaleElem.style.top = scaleElemSliderGap;
        }
        scaleElem.style.cursor = "pointer";

        let scaleElemWidth = this.getElementWidth(scaleElem, vertical);
        let scaleElemPosition = `${(scaleElem.style.bottom =
          (sliderWidth * (number - min)) / (max - min) -
          scaleElemWidth / 2)}px`;
        if (vertical) {
          scaleElem.style.bottom = scaleElemPosition;
        } else {
          scaleElem.style.left = scaleElemPosition;
        }
        this.scaleElements.push(scaleElem);
      }
      this.addEventListeners(this.scaleElements);
    }
  }
  addEventListeners(scale) {
    for (let scaleNumber of scale) {
      scaleNumber.addEventListener("click", (e) => this.scaleClick(e));
    }
  }
  scaleClick(e) {
    this.emit(SCALE_CLICK, e.target.innerText);
  }
}
export { Scale };
