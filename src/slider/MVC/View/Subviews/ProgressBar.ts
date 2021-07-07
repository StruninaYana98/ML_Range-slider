import { IOptions } from "../../Model";
import { Subview } from "./Subview";

class ProgressBar extends Subview {
  public rootObject: JQuery<HTMLElement>;
  public element: JQuery<HTMLElement>;

  constructor(rootObject: JQuery<HTMLElement>, options: IOptions) {
    super();
    this.rootObject = rootObject;
    this.createProgressBar(rootObject, options);
  }

  public createProgressBar(rootObject: JQuery<HTMLElement>, options: IOptions) {
    this.element = $('<div class="progressBar"></div>');
    rootObject.append(this.element);
    this.render(options);
  }

  public render(options: IOptions) {
    const { firstValue, secondValue, min, max, vertical } = options;
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

  public resizeProgressBar(action: string, options: IOptions) {
    const { vertical, min, max } = options;
    let sliderLength = this.getElementWidth(this.rootObject, vertical);
    let sliderStartPosition = this.getElementStartPosition(
      this.rootObject,
      vertical
    );
    let sliderEndPosition = this.getElementEndPosition(
      this.rootObject,
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
