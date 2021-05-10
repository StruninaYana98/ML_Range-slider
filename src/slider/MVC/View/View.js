import { Slider } from "./Subviews/Slider";
import { ProgressBar } from "./Subviews/ProgressBar";
import { SliderButton } from "./Subviews/SliderButton";
import { EventEmitter } from "../EventEmmiter";
import { Scale } from "./Subviews/Scale";
import { Tips } from "./Subviews/Tips";
import {
  FIRST_VALUE_CHANGED,
  SCALE_CLICK,
  SECOND_VALUE_CHANGED,
  VIEW_CHANGED,
} from "../actionTypes";
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
    this.addEventListeners();
  }

  notifySubscribers(event) {
    this.emit(VIEW_CHANGED, event);
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

  addEventListeners() {
    this.firstButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.firstButton.side)
    );
    this.secondButton.element.addEventListener("mousedown", (e) =>
      this.startButtonMove(e, this.secondButton.side)
    );
    this.progressBar.on(FIRST_VALUE_CHANGED, (value) =>
      this.notifySubscribers({ action: FIRST_VALUE_CHANGED, payload: value })
    );
    this.progressBar.on(SECOND_VALUE_CHANGED, (value) =>
      this.notifySubscribers({ action: SECOND_VALUE_CHANGED, payload: value })
    );
    this.scale.on(SCALE_CLICK, (value) =>
      this.notifySubscribers({ action: SCALE_CLICK, payload: value })
    );
  }

  startButtonMove(e, side) {
    if (side === "first") {
      this.progressBar.resizeProgressBar(e, FIRST_VALUE_CHANGED);
    } else if (side === "second") {
      this.progressBar.resizeProgressBar(e, SECOND_VALUE_CHANGED);
    }
  }
}

export { View };
