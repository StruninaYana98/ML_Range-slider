class Tips {
  constructor(view) {
    this.view = view;
    this.createTips();
  }
  createTips() {
    let firstTip = document.createElement("div");
    let secondTip = document.createElement("div");
    firstTip.className = "indicator";
    secondTip.className = "indicator";
    firstTip.style.position = "absolute";
    secondTip.style.position = "absolute";
    this.view.firstButton.element.append(firstTip);
    this.view.secondButton.element.append(secondTip);

    this.firstTip = firstTip;
    this.secondTip = secondTip;

    this.render();
  }

  render() {
    const { hasTips, firstValue, secondValue, vertical } = this.view.options;

    this.firstTip.hidden = !hasTips;
    this.secondTip.hidden = !hasTips;

    this.firstTip.innerText = firstValue;
    this.secondTip.innerText = secondValue;

    let firstTipSize1 = vertical
      ? this.firstTip.getBoundingClientRect().width
      : this.firstTip.getBoundingClientRect().height;
    let secondTipSize1 = vertical
      ? this.secondTip.getBoundingClientRect().width
      : this.secondTip.getBoundingClientRect().height;
    if (vertical) {
      this.firstTip.style.left = "-" + (firstTipSize1 + 5) + "px";
      this.secondTip.style.left = "-" + (secondTipSize1 + 5) + "px";
    } else {
      this.firstTip.style.top = "-" + (firstTipSize1 + 5) + "px";
      this.secondTip.style.top = "-" + (secondTipSize1 + 5) + "px";
    }

    let firstButtonSize = vertical
      ? this.view.firstButton.element.getBoundingClientRect().height
      : this.view.firstButton.element.getBoundingClientRect().width;
    let secondButtonSize = vertical
      ? this.view.secondButton.element.getBoundingClientRect().height
      : this.view.secondButton.element.getBoundingClientRect().width;

    let firstTipSize = vertical
      ? this.firstTip.getBoundingClientRect().height
      : this.firstTip.getBoundingClientRect().width;
    let secondTipSize = vertical
      ? this.secondTip.getBoundingClientRect().height
      : this.secondTip.getBoundingClientRect().width;

    if (vertical) {
      this.firstTip.style.top = firstButtonSize / 2 - firstTipSize / 2 + "px";
      this.secondTip.style.top =
        secondButtonSize / 2 - secondTipSize / 2 + "px";
    } else {
      this.firstTip.style.left = firstButtonSize / 2 - firstTipSize / 2 + "px";
      this.secondTip.style.left =
        secondButtonSize / 2 - secondTipSize / 2 + "px";
    }
  }
}
export { Tips };
