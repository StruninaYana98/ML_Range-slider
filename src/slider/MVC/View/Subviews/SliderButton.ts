import { View } from "../View";
import { Subview } from "./Subview";

class SliderButton extends Subview {
  private view: View;
  private side: string;
  public element: JQuery<HTMLElement>;

  constructor(view: View, side: string) {
    super();
    this.view = view;
    this.side = side;
    this.createButton();
  }
  public createButton() {
    this.element = $('<button class="sliderButton"></button>');
    this.view.progressBar.element.append(this.element);
    this.render();
  }
  public render() {
    const { vertical } = this.view.options;
    if (this.side === "first") {
      this.element.removeClass(
        vertical
          ? "sliderButton__first-horizontal"
          : "sliderButton__first-vertical"
      );
      this.element.addClass(
        vertical
          ? "sliderButton__first-vertical"
          : "sliderButton__first-horizontal"
      );
    } else if (this.side === "second") {
      this.element.removeClass(
        vertical
          ? "sliderButton__second-horizontal"
          : "sliderButton__second-vertical"
      );
      this.element.addClass(
        vertical
          ? "sliderButton__second-vertical"
          : "sliderButton__second-horizontal"
      );
    }
  }
}
export { SliderButton };
