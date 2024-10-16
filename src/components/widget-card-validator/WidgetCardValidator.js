import data from "../../data/cards-data.json";

import Heading from "../ui/Heading/Heading";
import ListCards from "../ui/ListCards/ListCards";
import FormCardValidatorUI from "./FormCardValidatorUI/FormCardValidatorUI";

import { isValidCard, luhnCheck } from "../../utils/validators";
import Span from "../ui/Span/Span";

export default class WidgetCardValidator {
  constructor(parentElem) {
    this.parentElem = parentElem;

    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.stateClass = null;
  }

  bindToDOM() {
    const heading = new Heading({
      class: "validator-title",
      text: "Validate Credit Card",
    }).element;
    const listCards = new ListCards({ data: data, class: "cards" }).element;
    const formCardValidatorUI = new FormCardValidatorUI().element;
    const span = new Span({ classes: ["message"], text: "" }).element;

    this.parentElem.append(heading, listCards, formCardValidatorUI, span);

    this.input = this.parentElem.querySelector(".validate-input");
    this.spanMess = this.parentElem.querySelector(".message");
    this.spanList = this.parentElem.querySelectorAll(".card");
    this.input.addEventListener("input", this.onInput);
    formCardValidatorUI.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.stateClass && luhnCheck(this.input.value)) {
      this.showMessage(`This card - ${this.stateClass} is valid`, "valid");
    } else {
      this.showMessage(`This card is not valid`, "invalid");
    }
  }

  onInput() {
    this.getValidCard(this.input);

    this.spanList.forEach((span) => {
      span.classList.remove("cdisabled");
      if (!span.classList.contains(this.stateClass) && this.stateClass) {
        span.classList.add("cdisabled");
      }
    });
  }

  getValidCard(input) {
    this.stateClass = null;
    data.forEach((card) => {
      const { start, length } = card.info[0];
      for (let i = 0; i < start.length; i++) {
        for (let j = 0; j < length.length; j++) {
          if (isValidCard(input.value, start[i], length[j])) {
            this.stateClass = card.card;
            return;
          }
        }
      }
    });
  }

  showMessage(text, type) {
    this.spanMess.classList.remove("valid", "invalid");
    this.spanMess.classList.add(type);
    this.spanMess.textContent = text;
  }
}
