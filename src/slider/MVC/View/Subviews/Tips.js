import { Subview } from "./Subview";

class Tips extends Subview {
  constructor(view) {
    super();
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

    const firstTipHeight = this.getElementHeight(this.firstTip, vertical);
    const secondTipHeight = this.getElementHeight(this.secondTip, vertical);
    if (vertical) {
      this.firstTip.style.left = `-${firstTipHeight + 5}px`;
      this.secondTip.style.left = `-${secondTipHeight + 5}px`;
    } else {
      this.firstTip.style.top = `-${firstTipHeight + 5}px`;
      this.secondTip.style.top = `-${secondTipHeight + 5}px`;
    }

    const firstButtonWidth = this.getElementWidth(
      this.view.firstButton.element,
      vertical
    );
    const secondButtonWidth = this.getElementWidth(
      this.view.secondButton.element,
      vertical
    );

    const firstTipWidth = this.getElementWidth(this.firstTip, vertical);
    const secondTipWidth = this.getElementWidth(this.secondTip, vertical);

    const firstTipPosition = firstButtonWidth / 2 - firstTipWidth / 2 + "px";
    const secondTipPosition = secondButtonWidth / 2 - secondTipWidth / 2 + "px";

    if (vertical) {
      this.firstTip.style.top = firstTipPosition;
      this.secondTip.style.top = secondTipPosition;
    } else {
      this.firstTip.style.left = firstTipPosition;
      this.secondTip.style.left = secondTipPosition;
    }
  }
}
export { Tips };
