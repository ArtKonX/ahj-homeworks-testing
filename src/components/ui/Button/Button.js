import "./button.css";

export default class Button {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const btn = document.createElement("button");

    btn.classList.add(this.params.class);
    btn.textContent = this.params.text;
    btn.type = this.params.type;

    return btn;
  }
}
