import Span from "../Span/Span";

import "./listCards.css";

export default class UiCardValidator {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createCardsList();
  }

  createCardsList() {
    const ul = document.createElement("ul");
    ul.classList.add(this.params.class);

    this.params.data.forEach((card) => {
      let li = document.createElement("li");
      let span = new Span({ classes: ["card", card.card], text: "" });
      ul.append(li);
      li.append(span.element);
    });

    return ul;
  }
}
