import "./input.css";

export default class Input {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const input = document.createElement("input");

    input.classList.add(this.params.class);
    input.required = this.params.required;
    input.placeholder = this.params.placeholder;

    return input;
  }
}
