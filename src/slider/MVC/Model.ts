import {
  FIRST_LOAD_OPTIONS,
  FIRST_VALUE_CHANGED,
  HAS_SCALE_CHANGED,
  HAS_TIPS_CHANGED,
  MAX_SCALE_NUMBERS_COUNT_CHANGED,
  MAX_VALUE_CHANGED,
  MIN_VALUE_CHANGED,
  MODEL_CHANGED,
  RANGE_CHANGED,
  SCALE_CLICK,
  SECOND_VALUE_CHANGED,
  STEP_CHANGED,
  VERTICAL_CHANGED,
} from "./actionTypes";
import { EventEmitter } from "./EventEmmiter";

interface ISliderEvent{
  action:string,
  payload:number|boolean|string|object
}
interface IOptions  {
  firstValue? : number,
  secondValue?:number,
  step?: number,
  range?:boolean,
  hasScale?:boolean,
  hasTips?:boolean,
  vertical?:boolean,
  min?:number,
  max?:number,
  maxScaleNumbersCount?:number,
  scaleValues?:number[],
}

const defaultOptions:IOptions = {
  firstValue: 0,
  secondValue: 5,
  step: 1,
  range: true,
  hasScale: true,
  hasTips: true,
  vertical: true,
  min: 0,
  max: 10,
  maxScaleNumbersCount: 10,
};

class Model extends EventEmitter {

  private options:IOptions

  constructor(options: IOptions) {
    super();
    this.options = options;
  }
 private validateOptions(options: IOptions):IOptions {
    if (typeof options !== "object") {
      return defaultOptions;
    }
    let validOptions :IOptions= { ...options };
    validOptions.range = !!validOptions.range;
    validOptions.hasScale = !!validOptions.hasScale;
    validOptions.hasTips = !!validOptions.hasTips;
    validOptions.vertical = !!validOptions.vertical;
    if (
      typeof validOptions.min !== "number" &&
      typeof validOptions.max !== "number"
    ) {
      validOptions.min = 0;
      validOptions.max =
        typeof validOptions.step === "number"
          ? validOptions.min + validOptions.step * 10
          : validOptions.min + 10;
    } else if (
      typeof validOptions.min !== "number" &&
      typeof validOptions.max === "number"
    ) {
      validOptions.min =
        typeof validOptions.step === "number"
          ? validOptions.max - validOptions.step * 10
          : validOptions.max - 10;
    } else if (
      typeof validOptions.min === "number" &&
      typeof validOptions.max !== "number"
    ) {
      validOptions.max =
        typeof validOptions.step === "number"
          ? validOptions.min + validOptions.step * 10
          : validOptions.min + 10;
    }
    if (validOptions.min > validOptions.max) {
      let val = validOptions.min;
      validOptions.min = validOptions.max;
      validOptions.max = val;
    }

    if (typeof validOptions.step !== "number") {
      validOptions.step = (validOptions.max - validOptions.min) / 10;
    }

    let stepValues:number[] = [];
    let valueInRange:number = validOptions.min;
    while (valueInRange < validOptions.max) {
      stepValues.push(valueInRange);
      valueInRange = valueInRange + validOptions.step;
    }
    stepValues.push(validOptions.max);

    validOptions.maxScaleNumbersCount =
      typeof validOptions.maxScaleNumbersCount !== "number"
        ? 10
        : validOptions.maxScaleNumbersCount < 2
        ? 2
        : Math.ceil(validOptions.maxScaleNumbersCount);

    let indexDiff:number = Math.ceil(
      stepValues.length / (validOptions.maxScaleNumbersCount - 1)
    );
    let scaleValues:number[] = [];
    let index:number = 0;
    while (index < stepValues.length - 1) {
      scaleValues.push(stepValues[index]);
      index = index + indexDiff;
    }
    scaleValues.push(stepValues[stepValues.length - 1]);

    validOptions.scaleValues = scaleValues;

    validOptions.firstValue =
      typeof validOptions.firstValue !== "number"
        ? validOptions.min
        : this.findClosestValue(validOptions.firstValue, stepValues);
    validOptions.secondValue =
      typeof validOptions.secondValue !== "number"
        ? validOptions.max
        : this.findClosestValue(validOptions.secondValue, stepValues);

    if (validOptions.firstValue > validOptions.secondValue) {
      let val = validOptions.firstValue;
      validOptions.firstValue = validOptions.secondValue;
      validOptions.secondValue = val;
    }
    if (!validOptions.range) {
      validOptions.firstValue = validOptions.min;
    }
    console.log(validOptions);
    return validOptions;
  }

 private findClosestValue(value:number, array:number[]):number {
    let diffArray:number[] = [];
    array.forEach(item=>diffArray.push(Math.abs(item - value)))
    let min:number = Math.min(...diffArray);
    let minIndex:number = diffArray.findIndex((item) => item === min);
    return array[minIndex];
  }

 public firstLoadOptions():void {
    this.options = this.validateOptions(this.options);
    this.emit(FIRST_LOAD_OPTIONS, { ...this.options });
  }

 public setMinValue(min:number):void {
    this.eventHandler({ action: MIN_VALUE_CHANGED, payload: min });
  }
  public  getMinValue():number {
    return this.options.min;
  }
  public  setMaxValue(max:number):void {
    this.eventHandler({ action: MAX_VALUE_CHANGED, payload: max });
  }
  public  getMaxValue():number {
    return this.options.max;
  }
  public  setFirstValue(value:number):void {
    this.eventHandler({ action: FIRST_VALUE_CHANGED, payload: value });
  }
  public  getFirstValue():number {
    return this.options.firstValue;
  }
  public  setSecondValue(value:number):void {
    this.eventHandler({ action: SECOND_VALUE_CHANGED, payload: value });
  }
  public  getSecondValue():number {
    return this.options.secondValue;
  }
  public  setHasTips(hasTips:boolean):void {
    this.eventHandler({ action: HAS_TIPS_CHANGED, payload: hasTips });
  }
  public  getHasTips():boolean {
    return this.options.hasTips;
  }
  public  setRange(range:boolean):void {
    this.eventHandler({ action: RANGE_CHANGED, payload: range });
  }
  public  getRange():boolean {
    return this.options.range;
  }
  public  setHasScale(hasScale:boolean):void {
    this.eventHandler({ action: HAS_SCALE_CHANGED, payload: hasScale });
  }
  public  getHasScale():boolean {
    return this.options.hasScale;
  }
  public  setVertical(vertical:boolean):void {
    this.eventHandler({ action: VERTICAL_CHANGED, payload: vertical });
  }
  public  getVertical():boolean {
    return this.options.vertical;
  }
  public  setStep(step:number):void {
    this.eventHandler({ action: STEP_CHANGED, payload: step });
  }
  public   getStep():number {
    return this.options.step;
  }
  public setMaxScaleNumbersCount(count:number):void {
    this.eventHandler({
      action: MAX_SCALE_NUMBERS_COUNT_CHANGED,
      payload: count,
    });
  }
  public  getMaxScaleNumbersCount():number {
    return this.options.maxScaleNumbersCount;
  }
 public eventHandler(event:ISliderEvent):void {
    this.reducer(event.action, event.payload);
  }
 private reducer(action: string, value:number|boolean|string|object) {
    let options :IOptions = { ...this.options };
    switch (action) {
      case FIRST_VALUE_CHANGED:
        options.firstValue = Number(value);
        break;
      case SECOND_VALUE_CHANGED:
        options.secondValue = Number(value);
        break;
      case MIN_VALUE_CHANGED:
        options.min = Number(value);
        break;
      case MAX_VALUE_CHANGED:
        options.max = Number(value);
        break;
      case SCALE_CLICK:
        if (options.range) {
          if (
            Math.abs(Number(value) - options.firstValue) <
            Math.abs(Number(value) - options.secondValue)
          ) {
            options.firstValue = Number(value);
          } else {
            options.secondValue = Number(value);
          }
        } else {
          options.secondValue = Number(value);
        }
        break;
      case HAS_TIPS_CHANGED:
        options.hasTips = Boolean(value);
        break;
      case RANGE_CHANGED:
        options.range = Boolean(value);
        break;
      case HAS_SCALE_CHANGED:
        options.hasScale =Boolean(value);
        break;
      case VERTICAL_CHANGED:
        options.vertical =Boolean(value);
        break;
      case STEP_CHANGED:
        options.step = Number(value);
        break;
      case MAX_SCALE_NUMBERS_COUNT_CHANGED:
        options.maxScaleNumbersCount = Number(value);
        break;
    }
    this.options = this.validateOptions(options);
    this.emit(MODEL_CHANGED, { ...this.options });
  }
}
export { Model, IOptions, ISliderEvent };
