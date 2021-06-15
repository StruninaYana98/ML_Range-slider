import { View } from "../View";
import { Subview } from "./Subview";

class Slider extends Subview {
  private view:View
  public element: HTMLElement

  constructor(view:View) {
    super();
    this.view = view;
    this.createSlider();
  }

 public  createSlider() {
    let slider = document.createElement(`div`);
    slider.className = "slider";
    this.element = slider;
    this.render();
  }

 public render() {
    const { vertical } = this.view.options;
    this.element.style.position = "relative";
    if (vertical) {
      this.element.style.width = "5px";
      this.element.style.height = "100%";
    } else {
      this.element.style.height = "5px";
      this.element.style.width = "100%";
    }
  }
}
export { Slider };
