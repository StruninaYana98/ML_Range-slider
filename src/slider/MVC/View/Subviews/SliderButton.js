class SliderButton {
  constructor(view, side) {
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
    let buttonWidth = this.element.getBoundingClientRect().width;

    let buttonHeight = this.element.getBoundingClientRect().height;

    let progressBarHeight = this.view.progressBar.element.getBoundingClientRect()
      .height;
    let progressBarWidth = this.view.progressBar.element.getBoundingClientRect()
      .width;

    let heightDiff = progressBarHeight - buttonHeight;
    let widthDiff = progressBarWidth - buttonWidth;

    if (this.view.options.vertical) {
      this.element.style.left = `${Number(widthDiff / 2)}px`;
      if (this.side === "first") {
        this.element.style.top = "auto";
        this.element.style.bottom = `-${Number(buttonHeight / 2)}px`;
      } else if (this.side === "second") {
        this.element.style.top = `-${Number(buttonHeight / 2)}px`;
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
