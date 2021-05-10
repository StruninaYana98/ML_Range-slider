import { Slider } from "./Subviews/Slider";
import { ProgressBar } from "./Subviews/ProgressBar";
import { SliderButton } from "./Subviews/SliderButton";
import { EventEmitter } from "../EventEmmiter";
import { Scale } from "./Subviews/Scale";
import { Tips } from "./Subviews/Tips";
class View extends EventEmitter {
  constructor(rootObject) {
    super();
    this.rootObject = rootObject;
  }
  createSlider(options) {
    this.options = options;
    this.slider = new Slider(this);
    this.rootObject.append(this.slider.element);
    this.progressBar = new ProgressBar(this);
    this.firstButton = new SliderButton(this, "first");
    this.secondButton = new SliderButton(this, "second");
    this.scale = new Scale(this);
    this.tips = new Tips(this);
    this.firstButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.firstButton.side)
    );
    this.secondButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.secondButton.side)
    );

    this.progressBar.on("firstButtonMoved", (value) =>
      this.notifyModel({ event: "firstButtonMoved", payload: value })
    );
    this.progressBar.on("secondButtonMoved", (value) =>
      this.notifyModel({ event: "secondButtonMoved", payload: value })
    );

    this.scale.on("scaleClick", (number) => this.emit("scaleClick", number));
  }
  startButtonMove(e, side) {
    if (side === "first") {
      this.progressBar.resizeProgressBar(e, "firstButtonMoved");
    } else if (side === "second") {
      this.progressBar.resizeProgressBar(e, "secondButtonMoved");
    }
  }

  notifyModel({ event, payload }) {
    this.emit(event, payload);
  }
  rerender(options) {
    this.options = options;
    this.slider.render();

    this.progressBar.render();
    this.firstButton.element.hidden = !options.range;
    this.firstButton.render();

    this.secondButton.render();
    this.scale.render();

    this.tips.render();
  }
}

export { View };
