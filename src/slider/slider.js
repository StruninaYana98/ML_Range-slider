import { View } from "./MVC/View/View";
import { Model } from "./MVC/Model";
import { Controller } from "./MVC/Controller";
$.fn.ML_RangeSlider = function (options) {
  const model = new Model(options);
  const view = new View(this, model, options);
  return new Controller(model, view);
};
