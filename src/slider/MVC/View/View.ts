import {
  MIN_VALUE_CHANGED,
  MAX_VALUE_CHANGED,
  HAS_TIPS_CHANGED,
  RANGE_CHANGED,
  HAS_SCALE_CHANGED,
  VERTICAL_CHANGED,
  STEP_CHANGED,
  MAX_SCALE_NUMBERS_COUNT_CHANGED,
} from "./../actionTypes";
import { Slider } from "./Subviews/Slider";
import { ProgressBar } from "./Subviews/ProgressBar";
import { SliderButton } from "./Subviews/SliderButton";
import { EventEmitter } from "../EventEmmiter";
import { IOptions, ISliderEvent, IModelEvent } from "../Model";
import { Scale } from "./Subviews/Scale";
import { Tips } from "./Subviews/Tips";
import {
  FIRST_VALUE_CHANGED,
  SCALE_CLICK,
  SECOND_VALUE_CHANGED,
  VIEW_CHANGED,
} from "../actionTypes";

class View extends EventEmitter {
  private rootObject: JQuery<HTMLElement>;
  public options: IOptions;
  public slider: Slider;
  public progressBar: ProgressBar;
  public firstButton: SliderButton;
  public secondButton: SliderButton;
  private scale: Scale;
  private tips: Tips;

  constructor(rootObject: JQuery<HTMLElement>) {
    super();
    this.rootObject = rootObject;
  }

  createSlider(options: IOptions) {
    this.options = options;
    this.slider = new Slider(this.rootObject, this.options);
    this.progressBar = new ProgressBar(this.slider.element, this.options);
    this.firstButton = new SliderButton(
      this.progressBar.element,
      this.options,
      "first"
    );
    if (!options.range) {
      this.firstButton.hideButton();
    }
    this.secondButton = new SliderButton(
      this.progressBar.element,
      this.options,
      "second"
    );
    this.scale = new Scale(this.slider.element, this.options);
    this.tips = new Tips(
      this.firstButton.element,
      this.secondButton.element,
      this.options
    );
    this.addEventListeners();
  }

  rerender(event: IModelEvent) {
    this.options = event.payload;

    switch (event.action) {
      case FIRST_VALUE_CHANGED:
        this.progressBar.render(this.options);
        this.tips.render(this.options);
        break;

      case SECOND_VALUE_CHANGED:
        this.progressBar.render(this.options);
        this.tips.render(this.options);
        break;

      case MIN_VALUE_CHANGED:
        this.progressBar.render(this.options);
        this.scale.render(this.options);
        this.tips.render(this.options);
        break;

      case MAX_VALUE_CHANGED:
        this.progressBar.render(this.options);
        this.scale.render(this.options);
        this.tips.render(this.options);
        break;

      case SCALE_CLICK:
        this.progressBar.render(this.options);
        this.tips.render(this.options);
        break;

      case HAS_TIPS_CHANGED:
        this.tips.render(this.options);

      case RANGE_CHANGED:
        this.progressBar.render(this.options);
        if (this.options.range) {
          this.firstButton.showButton();
        } else {
          this.firstButton.hideButton();
        }
        this.tips.render(this.options);
        break;

      case HAS_SCALE_CHANGED:
        this.scale.render(this.options);
        break;

      case VERTICAL_CHANGED:
        this.slider.render(this.options);
        this.progressBar.render(this.options);
        this.firstButton.render(this.options);
        this.secondButton.render(this.options);
        this.scale.render(this.options);
        this.tips.render(this.options);
        break;

      case STEP_CHANGED:
        this.progressBar.render(this.options);
        this.scale.render(this.options);
        this.tips.render(this.options);
        break;

      case MAX_SCALE_NUMBERS_COUNT_CHANGED:
        this.scale.render(this.options);
        break;
    }
  }

  addEventListeners() {
    this.firstButton.element.on("mousedown", () =>
      this.progressBar.resizeProgressBar(FIRST_VALUE_CHANGED, this.options)
    );
    this.secondButton.element.on("mousedown", () =>
      this.progressBar.resizeProgressBar(SECOND_VALUE_CHANGED, this.options)
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

  notifySubscribers(event: ISliderEvent): void {
    this.emit(VIEW_CHANGED, event);
  }
}

export { View };
