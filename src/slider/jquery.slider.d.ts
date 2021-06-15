import { IOptions } from "./MVC/Model";
import { Controller } from "./MVC/Controller";
declare global {
  interface JQuery {
    ml_RangeSlider: (options?: IOptions) => Controller;
  }
}
