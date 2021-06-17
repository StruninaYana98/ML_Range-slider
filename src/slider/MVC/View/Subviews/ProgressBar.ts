import { View } from "../View";
import { Subview } from "./Subview";

class ProgressBar extends Subview {
  private view: View;
  public element: JQuery<HTMLElement>;

  constructor(view: View) {
    super();
    this.view = view;
    this.createProgressBar();
  }
  public createProgressBar() {
    this.element = $('<div class="progressBar"></div>');
    this.view.slider.element.append(this.element);
    this.render();
  }
  public render() {
    const { firstValue, secondValue, min, max, vertical } = this.view.options;
    let progressBarStartPosition = (
      (100 * (firstValue - min)) /
      (max - min)
    ).toFixed(2);
    let progressBarEndPosition = (
      (100 * (max - secondValue)) /
      (max - min)
    ).toFixed(2);
    if (vertical) {
      this.element.css({
        top: `${progressBarEndPosition}%`,
        bottom: `${progressBarStartPosition}%`,
        left: "0",
        right: "0",
      });
    } else {
      this.element.css({
        left: `${progressBarStartPosition}%`,
        right: `${progressBarEndPosition}%`,
        top: "0",
        bottom: "0",
      });
    }
  }

  public resizeProgressBar(action: string) {
    const { vertical, min, max } = this.view.options;
    let sliderLength = this.getElementWidth(
      this.view.slider.element.get(0),
      vertical
    );
    let sliderStartPosition = this.getElementStartPosition(
      this.view.slider.element.get(0),
      vertical
    );
    let sliderEndPosition = this.getElementEndPosition(
      this.view.slider.element.get(0),
      vertical
    );

    document.onmousemove = (event) => {
      let movePosition = vertical ? event.pageY : event.pageX;
      let isInSlider = this.checkIsMouseInSlider(
        movePosition,
        sliderStartPosition,
        sliderEndPosition,
        vertical
      );
      if (isInSlider) {
        const value =
          min +
          Math.abs((movePosition - sliderStartPosition) / sliderLength) *
            (max - min);
        this.emit(action, value);
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
    
  }

  private checkIsMouseInSlider(
    movePosition: number,
    startPosition: number,
    endPosition: number,
    vertical: boolean
  ) {
    return (
      (vertical &&
        movePosition <= startPosition &&
        movePosition >= endPosition) ||
      (!vertical &&
        movePosition >= startPosition &&
        movePosition <= endPosition)
    );
  }
}
export { ProgressBar };
