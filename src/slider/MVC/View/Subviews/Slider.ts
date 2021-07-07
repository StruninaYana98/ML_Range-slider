import { IOptions } from "../../Model";
import { Subview } from "./Subview";

class Slider extends Subview {
  public rootObject: JQuery<HTMLElement>;
  public element: JQuery<HTMLElement>;

  constructor(rootObject: JQuery<HTMLElement>, options: IOptions) {
    super();
    this.rootObject = rootObject;
    this.createSlider(rootObject, options);
  }

  public createSlider(
    rootObject: JQuery<HTMLElement>,
    options: IOptions
  ): void {
    this.element = $('<div class="slider"></div>');
    rootObject.append(this.element);
    this.render(options);
  }

  public render(options: IOptions): void {
    const { vertical } = options;
    if (vertical) {
      this.element.addClass("slider__vertical");
    } else {
      this.element.removeClass("slider__vertical");
    }
  }
}

export { Slider };
