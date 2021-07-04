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
    this.slider = new Slider(this);
    this.rootObject.append(this.slider.element);
    this.progressBar = new ProgressBar(this);
    this.firstButton = new SliderButton(this, "first");
    if (!options.range) {
      this.firstButton.hideButton();
    }
    this.secondButton = new SliderButton(this, "second");
    this.scale = new Scale(this);
    this.tips = new Tips(this);
    this.addEventListeners();
  }

  rerender(event: IModelEvent) {
    this.options = event.payload;

    switch (event.action) {
      case FIRST_VALUE_CHANGED:
        this.progressBar.render();
        this.tips.render();
        break;

      case SECOND_VALUE_CHANGED:
        this.progressBar.render();
        this.tips.render();
        break;

      case MIN_VALUE_CHANGED:
        this.progressBar.render();
        this.scale.render();
        this.tips.render();
        break;

      case MAX_VALUE_CHANGED:
        this.progressBar.render();
        this.scale.render();
        this.tips.render();
        break;

      case SCALE_CLICK:
        this.progressBar.render();
        this.tips.render();
        break;

      case HAS_TIPS_CHANGED:
        this.tips.render();

      case RANGE_CHANGED:
        this.progressBar.render();
        if (this.options.range) {
          this.firstButton.showButton();
        } else {
          this.firstButton.hideButton();
        }
        break;

      case HAS_SCALE_CHANGED:
        this.scale.render();
        break;

      case VERTICAL_CHANGED:
        this.slider.render();
        this.progressBar.render();
        this.firstButton.render();
        this.secondButton.render();
        this.scale.render();
        this.tips.render();
        break;

      case STEP_CHANGED:
        this.progressBar.render();
        this.scale.render();
        this.tips.render();
        break;

      case MAX_SCALE_NUMBERS_COUNT_CHANGED:
        this.scale.render();
        break;
    }
  }

  addEventListeners() {
    this.firstButton.element.on("mousedown", () =>
      this.progressBar.resizeProgressBar(FIRST_VALUE_CHANGED)
    );
    this.secondButton.element.on("mousedown", () =>
      this.progressBar.resizeProgressBar(SECOND_VALUE_CHANGED)
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
