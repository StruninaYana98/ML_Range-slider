import { EventEmitter } from "../../EventEmmiter";

class Subview extends EventEmitter {

  constructor() {
    super();
  }

  protected getElementWidth(
    element: JQuery<HTMLElement>,
    isVertical: boolean
  ): number {
    const width = isVertical ? element.outerHeight() : element.outerWidth();
    return width;
  }

  protected getElementHeight(
    element: JQuery<HTMLElement>,
    isVertical: boolean
  ): number {
    const height = isVertical ? element.outerWidth() : element.outerHeight();
    return height;
  }

  protected getElementStartPosition(
    element: JQuery<HTMLElement>,
    isVertical: boolean
  ): number {
    const startPosition = isVertical
      ? element.offset().top + element.outerHeight() + window.pageYOffset
      : element.offset().left + window.pageXOffset;
    return startPosition;
  }

  protected getElementEndPosition(
    element: JQuery<HTMLElement>,
    isVertical: boolean
  ): number {
    const endPosition = isVertical
      ? element.offset().top + window.pageYOffset
      : element.offset().left + element.outerWidth() + window.pageXOffset;
    return endPosition;
  }
}

export { Subview };
