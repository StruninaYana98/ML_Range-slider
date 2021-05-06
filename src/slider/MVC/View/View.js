import { Slider } from "./Subviews/Slider";
import { ProgressBar } from "./Subviews/ProgressBar";
import { SliderButton } from "./Subviews/SliderButton";
import { EventEmitter } from "../EventEmmiter";
import { Scale } from "./Subviews/Scale";
import { Indicator } from "./Subviews/Indicator";
class View extends EventEmitter {
  constructor(rootObject, model, options) {
    super();
    this.options = options;
    this.model = model;
    this.slider = new Slider(this);
    rootObject.append(this.slider.element);
    this.progressBar = new ProgressBar(this);
    this.leftButton = new SliderButton(this, "left");
    this.rightButton = new SliderButton(this, "right");
    this.scale = new Scale(this);
    this.indicator = new Indicator(this);
    this.leftButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.leftButton.side)
    );
    this.rightButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.rightButton.side)
    );

    this.progressBar.on("buttonMoved", (options) => this.notifyModel(options));
    console.log(this.progressBar);
    this.scale.on("scaleClick", (number) => this.emit("scaleClick", number));
  }

  startButtonMove(e, side) {
    this.progressBar.resizeProgressBar(e, side);
  }

  notifyModel(options) {
    this.emit("buttonMoved", options);
  }
  rerender(options) {
    this.options = options;
    this.slider.render();

    this.progressBar.render();
    this.leftButton.element.hidden = !options.range;
    this.leftButton.render();

    this.rightButton.render();
    this.scale.render();

    this.indicator.render();
  }
}

export { View };
