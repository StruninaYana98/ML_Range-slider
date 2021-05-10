import { EventEmitter } from "../../EventEmmiter";

class Subview extends EventEmitter {
  constructor() {
    super();
  }

  getElementWidth(element, isVertical) {
    let width = isVertical
      ? element.getBoundingClientRect().height
      : element.getBoundingClientRect().width;
    return width;
  }
  getElementHeight(element, isVertical) {
    let height = isVertical
      ? element.getBoundingClientRect().width
      : element.getBoundingClientRect().height;
    return height;
  }
  getElementStartPosition(element, isVertical) {
    let startPosition = isVertical
      ? element.getBoundingClientRect().bottom + window.pageYOffset
      : element.getBoundingClientRect().left + window.pageXOffset;
    return startPosition;
  }
  getElementEndPosition(element, isVertical) {
    let endPosition = isVertical
      ? element.getBoundingClientRect().top + window.pageYOffset
      : element.getBoundingClientRect().right + window.pageXOffset;
    return endPosition;
  }
}
export { Subview };
