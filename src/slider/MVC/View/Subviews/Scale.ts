import { SCALE_CLICK } from "../../actionTypes";
import { IOptions } from "../../Model";
import { View } from "../View";
import { Subview } from "./Subview";

class Scale extends Subview {
  public rootObject: JQuery<HTMLElement>;
  private scaleElements: Array<JQuery<HTMLElement>>;

  constructor(rootObject: JQuery<HTMLElement>, options: IOptions) {
    super();
    this.rootObject = rootObject;
    this.createScale(rootObject, options);
  }

  public createScale(rootObject: JQuery<HTMLElement>, options: IOptions): void {
    this.scaleElements = [];
    this.render(options);
  }

  public render(options: IOptions): void {
    const { hasScale, vertical, scaleValues, min, max } = options;

    this.clearScale(this.scaleElements);
    /*  this.rootObject.find(".slider_scaleElement").remove();

    this.scaleElements = [];*/
    if (hasScale) {
      const sliderWidth = this.getElementWidth(this.rootObject, vertical);
      const sliderHeight = this.getElementHeight(this.rootObject, vertical);

      scaleValues.forEach((number) => {
        const scaleElem = $(
          `<div class="slider_scaleElement">${String(number)}</div>`
        );
        this.rootObject.append(scaleElem);

        const scaleElemSliderGap = `${sliderHeight + 20}px`;
        scaleElem.css(vertical ? "left" : "top", scaleElemSliderGap);

        const scaleElemWidth = this.getElementWidth(scaleElem, vertical);
        const scaleElemPosition = `${String(
          ((number - min) / (max - min) - scaleElemWidth / (sliderWidth * 2)) *
            100
        )}%`;
        scaleElem.css(vertical ? "bottom" : "left", scaleElemPosition);
        this.scaleElements.push(scaleElem);
      });

      this.addEventListeners(this.scaleElements);
    }
  }

  public clearScale(scale: Array<JQuery<HTMLElement>>): void {
    scale.forEach((elem) => elem.remove());
    scale = [];
  }

  private addEventListeners(scale: Array<JQuery<HTMLElement>>): void {
    for (let scaleElement of scale) {
      scaleElement.on("click", (e) => this.onScaleClick(scaleElement));
    }
  }

  private onScaleClick(scaleElement: JQuery<HTMLElement>): void {
    this.emit(SCALE_CLICK, scaleElement.text());
  }
}

export { Scale };
