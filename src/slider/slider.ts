import { View } from "./MVC/View/View";
import { IOptions, Model } from "./MVC/Model";
import { Controller } from "./MVC/Controller";

(function ($) {
  $.fn.ml_RangeSlider = function (options?: IOptions) {
    const view = new View(this);
    const model = new Model(options);
    return new Controller(model, view);
  };
})(jQuery);
