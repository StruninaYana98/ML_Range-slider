import { ControlsPanel } from "../ControlsPanel";

class Toggle {

  private panel:ControlsPanel
  public input:HTMLInputElement

  constructor(panel:ControlsPanel, header:string, checked:boolean) {
    this.panel = panel;
    this.createToggle(header, checked);
  }
  createToggle(header:string, checked:boolean) {
    let toggleWrapper = document.createElement("div");
    toggleWrapper.className = "controlElementWrapper";
    this.createHeader(toggleWrapper, header);
    this.input = this.createInput(toggleWrapper, checked);
    this.panel.element.append(toggleWrapper);
  }
  createHeader(wrapper:HTMLElement, text:string) {
    let header = document.createElement("h4");
    header.className = "controlElementHeader";
    header.innerText = text;
    wrapper.append(header);
  }
  createInput(wrapper:HTMLElement, checked:boolean) {
    let input = document.createElement("input");
    input.className = "toggleInput";
    input.type = "checkbox";
    input.checked = checked;
    wrapper.append(input);
    return input;
  }
}
export { Toggle };
