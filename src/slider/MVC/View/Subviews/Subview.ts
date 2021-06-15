import { EventEmitter } from "../../EventEmmiter";

class Subview extends EventEmitter {
  constructor() {
    super();
  }

 protected getElementWidth(element:HTMLElement, isVertical:boolean):number {
    const width = isVertical
      ? element.getBoundingClientRect().height
      : element.getBoundingClientRect().width;
    return width;
  }
 protected getElementHeight(element:HTMLElement, isVertical:boolean):number {
    const height = isVertical
      ? element.getBoundingClientRect().width
      : element.getBoundingClientRect().height;
    return height;
  }
 protected getElementStartPosition(element:HTMLElement, isVertical:boolean):number {
    const startPosition = isVertical
      ? element.getBoundingClientRect().bottom + window.pageYOffset
      : element.getBoundingClientRect().left + window.pageXOffset;
    return startPosition;
  }
 protected getElementEndPosition(element:HTMLElement, isVertical:boolean):number {
    const endPosition = isVertical
      ? element.getBoundingClientRect().top + window.pageYOffset
      : element.getBoundingClientRect().right + window.pageXOffset;
    return endPosition;
  }
}
export { Subview };
