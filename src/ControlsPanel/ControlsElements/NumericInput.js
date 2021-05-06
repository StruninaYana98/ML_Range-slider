class NumericInput {
  constructor(panel, header, value) {
    this.panel = panel;
    this.createNumericInput(header, value);
  }
  createNumericInput(header, value) {
    let numericInputWrapper = document.createElement("div");
    numericInputWrapper.className = "controlElementWrapper";
    let numericInputHeader = document.createElement("p");
    numericInputHeader.className = "controlElementHeader";
    numericInputHeader.innerText = header;

    numericInputWrapper.append(numericInputHeader);

    let buttonsInputWrapper = document.createElement("div");
    buttonsInputWrapper.className = "buttonsInputWrapper";
    numericInputWrapper.append(buttonsInputWrapper);

    let minusButton = document.createElement("button");
    minusButton.className = "inputButton";
    minusButton.innerText = "-";
    minusButton.onclick = () => {
      numericInput.value--;
      let event = new Event("change");
      numericInput.dispatchEvent(event);
    };
    buttonsInputWrapper.append(minusButton);

    let numericInput = document.createElement("input");
    numericInput.className = "numericInput";
    numericInput.value = value;
    numericInput.type = "number";
    buttonsInputWrapper.append(numericInput);

    let plusButton = document.createElement("button");
    plusButton.className = "inputButton";
    plusButton.innerText = "+";
    plusButton.onclick = (e) => {
      numericInput.value++;
      let event = new Event("change");
      numericInput.dispatchEvent(event);
    };
    buttonsInputWrapper.append(plusButton);

    this.panel.element.append(numericInputWrapper);
    this.element = numericInput;
  }
}
export { NumericInput };
