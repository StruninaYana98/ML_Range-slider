import { Slider } from "./Subviews/Slider";
import { ProgressBar } from "./Subviews/ProgressBar";
import { SliderButton } from "./Subviews/SliderButton";
import { EventEmitter } from "../EventEmmiter";
import {IOptions, ISliderEvent} from "../Model"
import { Scale } from "./Subviews/Scale";
import { Tips } from "./Subviews/Tips";
import {
  FIRST_VALUE_CHANGED,
  SCALE_CLICK,
  SECOND_VALUE_CHANGED,
  VIEW_CHANGED,
} from "../actionTypes";
class View extends EventEmitter {
  private rootObject:HTMLElement
  public options:IOptions
  public slider:Slider
  public progressBar:ProgressBar
  public firstButton:SliderButton
  public secondButton:SliderButton
  private scale:Scale
  private tips:Tips
  
  constructor(rootObject:HTMLElement) {
    super();
    this.rootObject = rootObject;
  }

  createSlider(options:IOptions) {
    this.options = options;
    this.slider = new Slider(this);
    this.rootObject.append(this.slider.element);
    this.progressBar = new ProgressBar(this);
    this.firstButton = new SliderButton(this, "first");
    this.firstButton.element.hidden = !options.range;
    this.secondButton = new SliderButton(this, "second");
    this.scale = new Scale(this);
    this.tips = new Tips(this);
    this.addEventListeners();
  }

  rerender(options:IOptions) {
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
    this.firstButton.element.addEventListener("mousedown", () =>
      this.progressBar.resizeProgressBar(FIRST_VALUE_CHANGED)
    );
    this.secondButton.element.addEventListener("mousedown", () =>
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

  notifySubscribers(event:ISliderEvent) :void{
    this.emit(VIEW_CHANGED, event);
  }
}

export { View };
