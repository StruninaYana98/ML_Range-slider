class Toggle {
  public input: JQuery<HTMLElement>;

  constructor(elem:JQuery<HTMLElement>, jqueryClass: string, checked: boolean) {
    this.findInput(elem,jqueryClass, checked)
  }

  findInput(elem:JQuery<HTMLElement>,jqueryClass: string, checked:boolean){
    this.input = elem.find(jqueryClass)
    this.input.prop("checked", checked)
  }
 
}
export { Toggle };
