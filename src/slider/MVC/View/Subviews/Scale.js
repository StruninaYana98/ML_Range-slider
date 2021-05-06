import { EventEmitter } from "../../EventEmmiter";

class Scale extends EventEmitter {
  constructor(view) {
    super();
    this.view = view;
    this.createScale();
  }
  createScale() {
    this.scaleElements = [];
    this.render();
  }
  render() {
    console.log(this.view.options.hasScale);
    for (let item of this.scaleElements) {
      this.view.slider.element.removeChild(item);
    }

    this.scaleElements = [];
    if (this.view.options.hasScale) {
      let number = this.view.options.min;
      let i = 0;
      let sliderLength = this.view.options.vertical
        ? this.view.slider.element.getBoundingClientRect().height
        : this.view.slider.element.getBoundingClientRect().width;
      let sliderThickness = this.view.options.vertical
        ? this.view.slider.element.getBoundingClientRect().width
        : this.view.slider.element.getBoundingClientRect().height;
      let stepLength =
        sliderLength *
        (this.view.options.step /
          (this.view.options.max - this.view.options.min));
      while (number <= this.view.options.max) {
        let scaleElem = document.createElement("div");
        scaleElem.innerText = number;
        this.view.slider.element.append(scaleElem);
        scaleElem.style.position = "absolute";
        if (this.view.options.vertical) {
          scaleElem.style.left = 20 + sliderThickness + "px";
        } else {
          scaleElem.style.top = 20 + sliderThickness + "px";
        }
        scaleElem.style.cursor = "pointer";

        let scaleSize = this.view.options.vertical
          ? scaleElem.getBoundingClientRect().height
          : scaleElem.getBoundingClientRect().width;
        if (this.view.options.vertical) {
          scaleElem.style.bottom = stepLength * i - scaleSize / 2 + "px";
        } else {
          scaleElem.style.left = stepLength * i - scaleSize / 2 + "px";
        }
        number += this.view.options.step;
        this.scaleElements.push(scaleElem);

        i++;
      }
      console.log(this.scaleElements);
      this.addEventListeners(this.scaleElements);
    }
  }
  addEventListeners(scale) {
    for (let scaleNumber of scale) {
      scaleNumber.addEventListener("click", (e) => this.scaleClick(e));
    }
  }
  scaleClick(e) {
    this.emit("scaleClick", e.target.innerText);
  }
}
export { Scale };
