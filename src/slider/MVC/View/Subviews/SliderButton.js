import { Subview } from "./Subview";

class SliderButton extends Subview {
  constructor(view, side) {
    super();
    this.view = view;
    this.side = side;
    this.createButton();
  }
  createButton() {
    let button = document.createElement("div");
    button.className = "sliderButton";
    this.view.progressBar.element.append(button);
    this.element = button;
    this.element.style.position = "absolute";
    this.render();
  }
  render() {
    const { vertical } = this.view.options;
    const buttonWidth = this.getElementWidth(this.element, vertical);
    const buttonHeight = this.getElementHeight(this.element, vertical);
    const progressBarHeight = this.getElementHeight(
      this.view.progressBar.element,
      vertical
    );
    const heightDiff = progressBarHeight - buttonHeight;

    if (vertical) {
      this.element.style.left = `${Number(heightDiff / 2)}px`;
      if (this.side === "first") {
        this.element.style.top = "auto";
        this.element.style.bottom = `-${Number(buttonWidth / 2)}px`;
      } else if (this.side === "second") {
        this.element.style.top = `-${Number(buttonWidth / 2)}px`;
      }
    } else {
      this.element.style.top = `${Number(heightDiff / 2)}px`;
      if (this.side === "first") {
        this.element.style.left = `-${Number(buttonWidth / 2)}px`;
      } else if (this.side === "second") {
        this.element.style.left = "auto";
        this.element.style.right = `-${Number(buttonWidth / 2)}px`;
      }
    }
  }
}
export { SliderButton };
