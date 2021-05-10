import { EventEmitter } from "../../EventEmmiter";
class ProgressBar extends EventEmitter {
  constructor(view) {
    super();
    this.view = view;
    this.createProgressBar();
  }
  createProgressBar() {
    let progressBar = document.createElement("div");
    progressBar.className = "progressBar";
    progressBar.style.position = "absolute";
    console.log(this.view.slider.element);
    this.view.slider.element.append(progressBar);
    this.element = progressBar;

    this.render();
  }
  render() {
    const { firstValue, secondValue, min, max, vertical } = this.view.options;
    let firstButtonPosition_pros = (firstValue - min) / (max - min);

    let sliderSize = vertical
      ? this.view.slider.element.getBoundingClientRect().height
      : this.view.slider.element.getBoundingClientRect().width;
    let firstButtonPosition = (sliderSize * firstButtonPosition_pros).toFixed(
      2
    );

    if (vertical) {
      this.element.style.bottom = firstButtonPosition + "px";
      this.element.style.left = "1px";
      this.element.style.right = "1px";
    } else {
      this.element.style.left = firstButtonPosition + "px";
      this.element.style.top = "1px";
      this.element.style.bottom = "1px";
    }
    let secondButtonPosition_pros = (max - secondValue) / (max - min);
    let secondButtonPosition = (sliderSize * secondButtonPosition_pros).toFixed(
      2
    );
    if (vertical) {
      this.element.style.top = secondButtonPosition + "px";
    } else {
      this.element.style.right = secondButtonPosition + "px";
    }
  }

  resizeProgressBar(event, action) {
    const { vertical, min, max } = this.view.options;

    let sliderLength = vertical
      ? this.view.slider.element.getBoundingClientRect().height
      : this.view.slider.element.getBoundingClientRect().width;

    let sliderStartPosition = vertical
      ? this.view.slider.element.getBoundingClientRect().bottom +
        window.pageYOffset
      : this.view.slider.element.getBoundingClientRect().left +
        window.pageXOffset;
    let sliderEndPosition = vertical
      ? this.view.slider.element.getBoundingClientRect().top +
        window.pageYOffset
      : this.view.slider.element.getBoundingClientRect().right +
        window.pageXOffset;

    document.onmousemove = (event) => {
      let movePosition = vertical ? event.pageY : event.pageX;
      let isInSlider = false;
      if (
        vertical &&
        movePosition <= sliderStartPosition &&
        movePosition >= sliderEndPosition
      ) {
        isInSlider = true;
      } else if (
        !vertical &&
        movePosition >= sliderStartPosition &&
        movePosition <= sliderEndPosition
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
