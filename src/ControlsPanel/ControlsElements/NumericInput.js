class NumericInput {
  constructor(panel, header, value) {
    this.panel = panel;
    this.createNumericInput(header, value);
  }
  createNumericInput(header, value) {
    let numericInputWrapper = document.createElement("div");
    numericInputWrapper.className = "controlElementWrapper";

    this.createHeader(numericInputWrapper, header);

    let buttonsInputWrapper = document.createElement("div");
    buttonsInputWrapper.className = "buttonsInputWrapper";
    numericInputWrapper.append(buttonsInputWrapper);

    this.minusButton = this.createButton(buttonsInputWrapper, "-");
    this.input = this.createInput(buttonsInputWrapper, value);
    this.plusButton = this.createButton(buttonsInputWrapper, "+");

    this.panel.element.append(numericInputWrapper);

    this.addEventListeners();
  }
  createHeader(wrapper, text) {
    let header = document.createElement("h4");
    header.className = "controlElementHeader";
    header.innerText = text;
    wrapper.append(header);
  }

  createButton(wrapper, buttonText) {
    let button = document.createElement("button");
    button.className = "inputButton";
    button.innerText = buttonText;
    wrapper.append(button);
    return button;
  }
  createInput(wrapper, value) {
    let input = document.createElement("input");
    input.className = "numericInput";
    input.value = value;
    input.type = "number";
    wrapper.append(input);
    return input;
  }

  addEventListeners() {
    this.minusButton.onclick = () => {
      this.input.value--;
      let event = new Event("change");
      this.input.dispatchEvent(event);
    };
    this.plusButton.onclick = () => {
      this.input.value++;
      let event = new Event("change");
      this.input.dispatchEvent(event);
    };
  }
}
export { NumericInput };
