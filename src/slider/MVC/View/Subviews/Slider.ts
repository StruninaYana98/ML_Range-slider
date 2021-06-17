import { View } from "../View";
import { Subview } from "./Subview";

class Slider extends Subview {
  private view: View;
  public element: JQuery<HTMLElement>;

  constructor(view: View) {
    super();
    this.view = view;
    this.createSlider();
  }

  public createSlider() {
    this.element = $('<div class="slider"></div>');
    this.render();
  }

  public render() {
    const { vertical } = this.view.options;
    if (vertical) {
      this.element.addClass("slider__vertical");
    } else {
      this.element.removeClass("slider__vertical");
    }
  }
}
export { Slider };
