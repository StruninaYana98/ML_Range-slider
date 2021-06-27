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

interface ISliderEvent {
  action: string;
  payload: number | boolean | string | object;
}
interface IOptions {
  firstValue?: number;
  secondValue?: number;
  step?: number;
  range?: boolean;
  hasScale?: boolean;
  hasTips?: boolean;
  vertical?: boolean;
  min?: number;
  max?: number;
  maxScaleNumbersCount?: number;
  scaleValues?: number[];
}

const defaultOptions: IOptions = {
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
  private options: IOptions;

  constructor(options: IOptions) {
    super();
    this.options = options;
  }

  public firstLoadOptions(): void {
    this.options = this.validateOptions(this.options);
    this.emit(FIRST_LOAD_OPTIONS, { ...this.options });
  }

  public setMinValue(min: number): void {
    this.eventHandler({ action: MIN_VALUE_CHANGED, payload: min });
  }

  public getMinValue(): number {
    return this.options.min;
  }

  public setMaxValue(max: number): void {
    this.eventHandler({ action: MAX_VALUE_CHANGED, payload: max });
  }

  public getMaxValue(): number {
    return this.options.max;
  }

  public setFirstValue(value: number): void {
    this.eventHandler({ action: FIRST_VALUE_CHANGED, payload: value });
  }

  public getFirstValue(): number {
    return this.options.firstValue;
  }

  public setSecondValue(value: number): void {
    this.eventHandler({ action: SECOND_VALUE_CHANGED, payload: value });
  }

  public getSecondValue(): number {
    return this.options.secondValue;
  }

  public setHasTips(hasTips: boolean): void {
    this.eventHandler({ action: HAS_TIPS_CHANGED, payload: hasTips });
  }

  public getHasTips(): boolean {
    return this.options.hasTips;
  }

  public setRange(range: boolean): void {
    this.eventHandler({ action: RANGE_CHANGED, payload: range });
  }

  public getRange(): boolean {
    return this.options.range;
  }

  public setHasScale(hasScale: boolean): void {
    this.eventHandler({ action: HAS_SCALE_CHANGED, payload: hasScale });
  }

  public getHasScale(): boolean {
    return this.options.hasScale;
  }

  public setVertical(vertical: boolean): void {
    this.eventHandler({ action: VERTICAL_CHANGED, payload: vertical });
  }

  public getVertical(): boolean {
    return this.options.vertical;
  }

  public setStep(step: number): void {
    this.eventHandler({ action: STEP_CHANGED, payload: step });
  }

  public getStep(): number {
    return this.options.step;
  }

  public setMaxScaleNumbersCount(count: number): void {
    this.eventHandler({
      action: MAX_SCALE_NUMBERS_COUNT_CHANGED,
      payload: count,
    });
  }

  public getMaxScaleNumbersCount(): number {
    return this.options.maxScaleNumbersCount;
  }

  public eventHandler(event: ISliderEvent): void {
    this.reducer(event.action, event.payload);
  }

  private reducer(action: string, value: number | boolean | string | object) {
    let options: IOptions = { ...this.options };

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
        options.hasScale = Boolean(value);
        break;
      case VERTICAL_CHANGED:
        options.vertical = Boolean(value);
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

  private validateOptions(options: IOptions): IOptions {
    if (typeof options !== "object") {
      return defaultOptions;
    }

    let validOptions: IOptions = { ...options };

    validOptions.range = !!validOptions.range;
    validOptions.hasScale = !!validOptions.hasScale;
    validOptions.hasTips = !!validOptions.hasTips;
    validOptions.vertical = !!validOptions.vertical;

    this.getValidMinMaxValues(validOptions);

    validOptions.step = this.getValidStep(
      validOptions.step,
      validOptions.min,
      validOptions.max
    );

    validOptions.maxScaleNumbersCount = this.getValidMaxScaleNumbersCount(
      validOptions.maxScaleNumbersCount
    );

    validOptions.scaleValues = this.getScaleValues(
      validOptions.min,
      validOptions.max,
      validOptions.step,
      validOptions.maxScaleNumbersCount
    );

    validOptions.firstValue =
      typeof validOptions.firstValue !== "number" || !validOptions.range
        ? validOptions.min
        : this.findClosestScaleValue(
            validOptions.min,
            validOptions.max,
            validOptions.step,
            validOptions.firstValue
          );

    validOptions.secondValue =
      typeof validOptions.secondValue !== "number"
        ? validOptions.max
        : this.findClosestScaleValue(
            validOptions.min,
            validOptions.max,
            validOptions.step,
            validOptions.secondValue
          );

    if (validOptions.firstValue > validOptions.secondValue) {
      const val = validOptions.firstValue;
      validOptions.firstValue = validOptions.secondValue;
      validOptions.secondValue = val;
    }

    return validOptions;
  }

  private getValidMinMaxValues(options: IOptions): void {
    const isBothNotNumbers =
      typeof options.min !== "number" && typeof options.max !== "number";
    const isOnlyMaxNumber =
      typeof options.min !== "number" && typeof options.max === "number";
    const isOnlyMinNumber =
      typeof options.min === "number" && typeof options.max !== "number";
    const isStepValidNumber =
      typeof options.step === "number" && options.step > 0;

    if (isBothNotNumbers) {
      options.min = 0;
      options.max = isStepValidNumber
        ? options.min + options.step * 10
        : options.min + 10;
    } else if (isOnlyMaxNumber) {
      options.min = isStepValidNumber
        ? options.max - options.step * 10
        : options.max - 10;
    } else if (isOnlyMinNumber) {
      options.max = isStepValidNumber
        ? options.min + options.step * 10
        : options.min + 10;
    }
    if (options.min > options.max) {
      const val = options.min;
      options.min = options.max;
      options.max = val;
    }
  }

  private findClosestScaleValue(
    min: number,
    max: number,
    step: number,
    value: number
  ): number {
    if (value - min < 0) return min;
    if (max - value < (max - Math.floor(max / step) * step) / 2) {
      return max;
    }

    let valDiff = value - min;
    let stepsCount = Math.round(valDiff / step);
    let stepValue = min + stepsCount * step;

    if (stepValue > max) {
      return max;
    } else {
      return stepValue;
    }
  }

  private getScaleValues(
    min: number,
    max: number,
    step: number,
    maxScaleNumbersCount: number
  ): Array<number> {
    const stepValuesCount = Math.ceil((max - min) / step) + 1;
    const indexDiff = Math.ceil(stepValuesCount / maxScaleNumbersCount);

    let scaleValues: number[] = [];
    for (let i = 0; i < stepValuesCount - 1; i = i + indexDiff) {
      scaleValues.push(min + i * step);
    }
    scaleValues.push(max);

    return scaleValues;
  }

  private getValidMaxScaleNumbersCount(maxScaleNumbersCount: number): number {
    const validMaxScaleNumbersCount =
      typeof maxScaleNumbersCount !== "number"
        ? 10
        : maxScaleNumbersCount < 2
        ? 2
        : Math.ceil(maxScaleNumbersCount);

    return validMaxScaleNumbersCount;
  }

  private getValidStep(step: number, min: number, max: number): number {
    if (typeof step !== "number" || step <= 0) {
      return (max - min) / 10;
    }

    return step;
  }
}
export { Model, IOptions, ISliderEvent };
