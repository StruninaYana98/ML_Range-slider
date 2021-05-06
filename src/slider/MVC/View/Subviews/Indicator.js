class Indicator {
  constructor(view) {
    this.view = view;
    this.createIndicator();
  }
  createIndicator() {
    let firstIndicator = document.createElement("div");
    let secondIndicator = document.createElement("div");
    firstIndicator.className = "indicator";
    secondIndicator.className = "indicator";
    firstIndicator.style.position = "absolute";
    secondIndicator.style.position = "absolute";
    this.view.leftButton.element.append(firstIndicator);
    this.view.rightButton.element.append(secondIndicator);

    this.firstIndicator = firstIndicator;
    this.secondIndicator = secondIndicator;

    this.render();
  }

  render() {
    console.log(this.firstIndicator);
    console.log(this.secondIndicator);

    this.firstIndicator.hidden = !this.view.options.hasIndicator;
    this.secondIndicator.hidden = !this.view.options.hasIndicator;
    console.log(this.firstIndicator.style.hidden);
    this.firstIndicator.innerText = this.view.options.currLeft;

    this.secondIndicator.innerText = this.view.options.currRight;
    let firstIndicatorSize1 = this.view.options.vertical
      ? this.firstIndicator.getBoundingClientRect().width
      : this.firstIndicator.getBoundingClientRect().height;
    let secondIndicatorSize1 = this.view.options.vertical
      ? this.secondIndicator.getBoundingClientRect().width
      : this.secondIndicator.getBoundingClientRect().height;
    if (this.view.options.vertical) {
      this.firstIndicator.style.left = "-" + (firstIndicatorSize1 + 5) + "px";
      this.secondIndicator.style.left = "-" + (secondIndicatorSize1 + 5) + "px";
    } else {
      this.firstIndicator.style.top = "-" + (firstIndicatorSize1 + 5) + "px";
      this.secondIndicator.style.top = "-" + (secondIndicatorSize1 + 5) + "px";
    }

    try {
      let leftbuttonSize = this.view.options.vertical
        ? this.view.leftButton.element.getBoundingClientRect().height
        : this.view.leftButton.element.getBoundingClientRect().width;
      let rightbuttonSize = this.view.options.vertical
        ? this.view.rightButton.element.getBoundingClientRect().height
        : this.view.rightButton.element.getBoundingClientRect().width;

      let firstIndicatorSize = this.view.options.vertical
        ? this.firstIndicator.getBoundingClientRect().height
        : this.firstIndicator.getBoundingClientRect().width;
      let secondIndicatorSize = this.view.options.vertical
        ? this.secondIndicator.getBoundingClientRect().height
        : this.secondIndicator.getBoundingClientRect().width;

      if (this.view.options.vertical) {
        this.firstIndicator.style.top =
          leftbuttonSize / 2 - firstIndicatorSize / 2 + "px";
        this.secondIndicator.style.top =
          rightbuttonSize / 2 - secondIndicatorSize / 2 + "px";
      } else {
        this.firstIndicator.style.left =
          leftbuttonSize / 2 - firstIndicatorSize / 2 + "px";
        this.secondIndicator.style.left =
          rightbuttonSize / 2 - secondIndicatorSize / 2 + "px";
      }
    } catch (err) {
      console.log("здесь");
    }
  }
}
export { Indicator };
