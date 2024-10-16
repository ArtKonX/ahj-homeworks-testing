export default class Form {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const form = document.createElement("form");

    form.classList.add(this.params.class);

    return form;
  }
}
