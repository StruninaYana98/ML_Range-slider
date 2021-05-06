class Slider {
  constructor(view) {
    this.view = view;
    this.createSlider();
  }

  createSlider() {
    let slider = document.createElement(`div`);
    slider.className = "slider";

    this.element = slider;
    console.log(this.element);
    this.render();
  }
  render() {
    this.view.options;
    this.element.style.position = "relative";
    if (this.view.options.vertical) {
      this.element.style.width = "5px";
      this.element.style.height = "100%";
    } else {
      this.element.style.height = "5px";
      this.element.style.width = "100%";
    }
  }
}
export { Slider };
