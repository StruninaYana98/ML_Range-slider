import { IOptions } from "../../Model";
import { Subview } from "./Subview";

class SliderButton extends Subview {
  private rootObject: JQuery<HTMLElement>;
  private side: string;
  public element: JQuery<HTMLElement>;

  constructor(
    rootObject: JQuery<HTMLElement>,
    options: IOptions,
    side: string
  ) {
    super();
    this.rootObject = rootObject;
    this.side = side;
    this.createButton(rootObject, options);
  }

  public createButton(
    rootObject: JQuery<HTMLElement>,
    options: IOptions
  ): void {
    this.element = $('<button class="sliderButton"></button>');
    rootObject.append(this.element);
    this.render(options);
  }

  public render(options: IOptions): void {
    const { vertical } = options;
    
    if (this.side === "first") {
      this.element
        .removeClass(
          vertical
            ? "sliderButton__first-horizontal"
            : "sliderButton__first-vertical"
        )
        .addClass(
          vertical
            ? "sliderButton__first-vertical"
            : "sliderButton__first-horizontal"
        );
    } else if (this.side === "second") {
      this.element
        .removeClass(
          vertical
            ? "sliderButton__second-horizontal"
            : "sliderButton__second-vertical"
        )
        .addClass(
          vertical
            ? "sliderButton__second-vertical"
            : "sliderButton__second-horizontal"
        );
    }
  }

  public hideButton() {
    this.element.hide();
  }

  public showButton() {
    this.element.show();
  }
}

export { SliderButton };
