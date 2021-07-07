import { IOptions } from "../../Model";
import { Subview } from "./Subview";

class Tips extends Subview {
  private firstRootObject: JQuery<HTMLElement>;
  private secondRootObject: JQuery<HTMLElement>;
  private firstTip: JQuery<HTMLElement>;
  private secondTip: JQuery<HTMLElement>;

  constructor(
    firstRootObject: JQuery<HTMLElement>,
    secondRootObject: JQuery<HTMLElement>,
    options: IOptions
  ) {
    super();
    this.firstRootObject = firstRootObject;
    this.secondRootObject = secondRootObject;
    this.createTips(firstRootObject, secondRootObject, options);
  }

  public createTips(
    firstRootObject: JQuery<HTMLElement>,
    secondRootObject: JQuery<HTMLElement>,
    options: IOptions
  ) {
    this.firstTip = $('<div class="tip"></div>');
    this.secondTip = $('<div class="tip"></div>');
    firstRootObject.append(this.firstTip);
    secondRootObject.append(this.secondTip);

    this.render(options);
  }

  public render(options: IOptions) {
    const { hasTips, firstValue, secondValue, vertical } = options;

    if (!hasTips) {
      this.firstTip.hide();
      this.secondTip.hide();

    } else {
      this.firstTip.show();
      this.secondTip.show();

      this.firstTip.text(String(firstValue));
      this.secondTip.text(String(secondValue));

      const firstTipHeight = this.getElementHeight(this.firstTip, vertical);
      const secondTipHeight = this.getElementHeight(this.secondTip, vertical);

      this.firstTip.css(vertical ? "left" : "top", `-${firstTipHeight + 5}px`);
      this.secondTip.css(
        vertical ? "left" : "top",
        `-${secondTipHeight + 5}px`
      );

      const firstButtonWidth = this.getElementWidth(
        this.firstRootObject,
        vertical
      );
      const secondButtonWidth = this.getElementWidth(
        this.secondRootObject,
        vertical
      );

      const firstTipWidth = this.getElementWidth(this.firstTip, vertical);
      const secondTipWidth = this.getElementWidth(this.secondTip, vertical);

      const firstTipPosition = firstButtonWidth / 2 - firstTipWidth / 2 + "px";
      const secondTipPosition =
        secondButtonWidth / 2 - secondTipWidth / 2 + "px";

      this.firstTip.css(vertical ? "top" : "left", firstTipPosition);
      this.secondTip.css(vertical ? "top" : "left", secondTipPosition);
    }
  }
}

export { Tips };
