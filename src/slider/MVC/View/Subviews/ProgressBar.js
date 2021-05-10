import { Subview } from "./Subview";
class ProgressBar extends Subview {
  constructor(view) {
    super();
    this.view = view;
    this.createProgressBar();
  }
  createProgressBar() {
    let progressBar = document.createElement("div");
    progressBar.className = "progressBar";
    progressBar.style.position = "absolute";
    this.view.slider.element.append(progressBar);
    this.element = progressBar;
    this.render();
  }
  render() {
    const { firstValue, secondValue, min, max, vertical } = this.view.options;

    let sliderWidth = this.getElementWidth(this.view.slider.element, vertical);
    let progressBarStartPosition = (
      (sliderWidth * (firstValue - min)) /
      (max - min)
    ).toFixed(2);

    if (vertical) {
      this.element.style.bottom = `${progressBarStartPosition}px`;
      this.element.style.left = "0px";
      this.element.style.right = "0px";
    } else {
      this.element.style.left = `${progressBarStartPosition}px`;
      this.element.style.top = "0px";
      this.element.style.bottom = "0px";
    }

    let progressBarEndPosition = (
      (sliderWidth * (max - secondValue)) /
      (max - min)
    ).toFixed(2);
    if (vertical) {
      this.element.style.top = `${progressBarEndPosition}px`;
    } else {
      this.element.style.right = `${progressBarEndPosition}px`;
    }
  }

  resizeProgressBar(action) {
    const { vertical, min, max } = this.view.options;

    let sliderLength = this.getElementWidth(this.view.slider.element, vertical);
    let sliderStartPosition = this.getElementStartPosition(
      this.view.slider.element,
      vertical
    );
    let sliderEndPosition = this.getElementEndPosition(
      this.view.slider.element,
      vertical
    );

    document.onmousemove = (event) => {
      let movePosition = vertical ? event.pageY : event.pageX;
      let isInSlider = false;
      if (
        (vertical &&
          movePosition <= sliderStartPosition &&
          movePosition >= sliderEndPosition) ||
        (!vertical &&
          movePosition >= sliderStartPosition &&
          movePosition <= sliderEndPosition)
      ) {
        isInSlider = true;
      }
      if (isInSlider) {
        const value =
          min +
          Math.abs((movePosition - sliderStartPosition) / sliderLength) *
            (max - min);
        this.emit(action, value);
      }
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  }
}
export { ProgressBar };
