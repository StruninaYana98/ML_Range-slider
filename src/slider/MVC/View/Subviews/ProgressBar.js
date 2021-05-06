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
    let firstButtonPosition_pros =
      (this.view.options.currLeft - this.view.options.min) /
      (this.view.options.max - this.view.options.min);

    let sliderSize = this.view.options.vertical
      ? this.view.slider.element.getBoundingClientRect().height
      : this.view.slider.element.getBoundingClientRect().width;
    let firstButtonPosition = (sliderSize * firstButtonPosition_pros).toFixed(
      2
    );

    if (this.view.options.vertical) {
      this.element.style.bottom = firstButtonPosition + "px";
      this.element.style.left = "1px";
      this.element.style.right = "1px";
    } else {
      this.element.style.left = firstButtonPosition + "px";
      this.element.style.top = "1px";
      this.element.style.bottom = "1px";
    }
    let secondButtonPosition_pros =
      (this.view.options.max - this.view.options.currRight) /
      (this.view.options.max - this.view.options.min);
    let secondButtonPosition = (sliderSize * secondButtonPosition_pros).toFixed(
      2
    );
    if (this.view.options.vertical) {
      this.element.style.top = secondButtonPosition + "px";
    } else {
      this.element.style.right = secondButtonPosition + "px";
    }
  }

  resizeProgressBar(event, side) {
    let startPosition = this.view.options.vertical ? event.pageY : event.pageX;
    console.log("startPosition  " + startPosition);
    //  let rightcoord = this.progressBar.getBoundingClientRect().right;
    document.onmousemove = (event) => {
      let movePosition = this.view.options.vertical ? event.pageY : event.pageX;
      console.log("movePosition  " + movePosition);
      // let barCoord = this.progressBar.getBoundingClientRect();

      //    let width = barCoord.width;
      let sliderLength = this.view.options.vertical
        ? this.view.slider.element.getBoundingClientRect().height
        : this.view.slider.element.getBoundingClientRect().width;

      let stepLength =
        (sliderLength * this.view.options.step) /
        (this.view.options.max - this.view.options.min);

      console.log(startPosition - stepLength);

      if (movePosition <= startPosition - stepLength / 2) {
        if (side === "left") {
          this.emit("buttonMoved", {
            currLeft: this.view.options.vertical
              ? Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                )
              : -Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                ),
          });
        } else if (side === "right") {
          this.emit("buttonMoved", {
            currRight: this.view.options.vertical
              ? Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                )
              : -Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                ),
          });
        }
        startPosition =
          startPosition -
          stepLength *
            Math.floor(Math.abs((startPosition - movePosition) / stepLength));
      } else if (movePosition >= startPosition + stepLength / 2) {
        if (side === "left") {
          this.emit("buttonMoved", {
            currLeft: this.view.options.vertical
              ? -Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                )
              : Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                ),
          });
        } else if (side === "right") {
          this.emit("buttonMoved", {
            currRight: this.view.options.vertical
              ? -Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                )
              : Math.floor(
                  Math.abs((startPosition - movePosition) / stepLength)
                ),
          });
        }
        startPosition =
          startPosition +
          stepLength *
            Math.floor(Math.abs((startPosition - movePosition) / stepLength));
      }
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  }
}
export { ProgressBar };
