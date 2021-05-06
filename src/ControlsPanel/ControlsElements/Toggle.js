class Toggle {
  constructor(panel, header, checked) {
    this.panel = panel;
    this.createToggle(header, checked);
  }
  createToggle(header, checked) {
    let toggleWrapper = document.createElement("div");
    toggleWrapper.className = "controlElementWrapper";
    let toggleHeader = document.createElement("p");
    toggleHeader.className = "controlElementHeader";
    toggleHeader.innerText = header;
    toggleWrapper.append(toggleHeader);
    let toggleInput = document.createElement("input");
    toggleInput.className = "toggleInput";
    toggleInput.type = "checkbox";
    toggleInput.checked = checked;
    toggleWrapper.append(toggleInput);
    this.panel.element.append(toggleWrapper);
    this.element = toggleInput;
  }
}
export { Toggle };
