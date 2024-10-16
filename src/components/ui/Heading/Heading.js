import "./heading.css";

export default class Heading {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const heading = document.createElement("h1");

    heading.classList.add(this.params.class);
    heading.textContent = this.params.text;

    return heading;
  }
}
