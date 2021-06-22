class NumericInput {
  public input: JQuery<HTMLElement>;
  public minusButton: JQuery<HTMLElement>;
  public plusButton: JQuery<HTMLElement>;

  constructor(elem: JQuery<HTMLElement>, jqueryClass: string, value: number) {
    this.findInput(elem, jqueryClass, value);
  }
  
  findInput(elem: JQuery<HTMLElement>, jqueryClass: string, value: number) {
    this.input = elem.find(jqueryClass);
    this.input.prop("value", value);
    this.minusButton = this.input.siblings(".js-minus-button");
    this.plusButton = this.input.siblings(".js-plus-button");
    this.addEventListeners();
  }

  addEventListeners() {
    this.minusButton.on("click", () => {
      this.input.prop("value", Number(this.input.prop("value")) - 1);
      this.input.trigger("change");
    });
    this.plusButton.on("click", () => {
      this.input.prop("value", Number(this.input.prop("value")) + 1);
      this.input.trigger("change");
    });
  }
}
export { NumericInput };
