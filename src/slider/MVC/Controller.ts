import { FIRST_LOAD_OPTIONS, MODEL_CHANGED, VIEW_CHANGED } from "./actionTypes";
import { EventEmitter , Listener} from "./EventEmmiter";
import { Model } from "./Model";
import { View } from "./View/View";

class Controller extends EventEmitter {
  private model:Model
  private view:View

  constructor(model : Model, view: View) {

    super();
    this.model = model;
    this.view = view;

    this.model.on(FIRST_LOAD_OPTIONS, (options) =>
      this.view.createSlider(options)
    );
    this.view.on(VIEW_CHANGED, (event) => this.model.eventHandler(event));
    this.model.on(MODEL_CHANGED, (options) => this.view.rerender(options));
    this.model.firstLoadOptions();
  }

  setMinValue(min: number) : void{
    this.model.setMinValue(min);
  }
  getMinValue():number {
    return this.model.getMinValue();
  }
  setMaxValue(max:number):void {
    this.model.setMaxValue(max);
  }
  getMaxValue():number {
    return this.model.getMaxValue();
  }
  setFirstValue(value:number):void {
    this.model.setFirstValue(value);
  }
  getFirstValue():number {
    return this.model.getFirstValue();
  }
  setSecondValue(value: number):void {
    this.model.setSecondValue(value);
  }
  getSecondValue():number {
    return this.model.getSecondValue();
  }
  setHasTips(hasTips:boolean):void {
    this.model.setHasTips(hasTips);
  }
  getHasTips():boolean {
    return this.model.getHasTips();
  }
  setRange(range: boolean):void {
    this.model.setRange(range);
  }
  getRange():boolean {
    return this.model.getRange();
  }
  setHasScale(hasScale:boolean):void {
    this.model.setHasScale(hasScale);
  }
  getHasScale():boolean {
    return this.model.getHasScale();
  }
  setVertical(vertical:boolean):void {
    this.model.setVertical(vertical);
  }
  getVertical():boolean {
    return this.model.getVertical();
  }
  setStep(step:number):void {
    this.model.setStep(step);
  }
  getStep():number {
    return this.model.getStep();
  }
  setMaxScaleNumbersCount(count:number):void {
    this.model.setMaxScaleNumbersCount(count);
  }
  getMaxScaleNumbersCount():number {
    return this.model.getMaxScaleNumbersCount();
  }
  addEventListener(eventHandler:Listener) {
    this.model.on(MODEL_CHANGED, (options) => eventHandler(options));
  }
}
export { Controller };
