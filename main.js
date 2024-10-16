/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/data/cards-data.json
const cards_data_namespaceObject = /*#__PURE__*/JSON.parse('[{"id":1,"card":"mir","info":[{"start":[2],"length":[16]}]},{"id":2,"card":"visa","info":[{"start":[4],"length":[13,16,19]}]},{"id":3,"card":"mastercard","info":[{"start":[51,52,53,54,55],"length":[16]}]},{"id":4,"card":"american-express","info":[{"start":[34,37],"length":[15]}]},{"id":5,"card":"discover","info":[{"start":[60,62,64,65],"length":[16,19]}]},{"id":6,"card":"jcb","info":[{"start":[35],"length":[16,19]}]},{"id":7,"card":"diners-club","info":[{"start":[30,36,54],"length":[14,16]}]}]');
;// ./src/components/ui/Heading/Heading.js

class Heading {
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
;// ./src/components/ui/Span/Span.js

class Span {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const span = document.createElement("span");
    span.classList.add(...this.params.classes);
    span.textContent = this.params.text;
    return span;
  }
}
;// ./src/components/ui/ListCards/ListCards.js


class UiCardValidator {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createCardsList();
  }
  createCardsList() {
    const ul = document.createElement("ul");
    ul.classList.add(this.params.class);
    this.params.data.forEach(card => {
      let li = document.createElement("li");
      let span = new Span({
        classes: ["card", card.card],
        text: ""
      });
      ul.append(li);
      li.append(span.element);
    });
    return ul;
  }
}
;// ./src/components/ui/Form/Form.js
class Form {
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
;// ./src/components/ui/Input/Input.js

class Input {
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
;// ./src/components/ui/Button/Button.js

class Button {
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
;// ./src/components/widget-card-validator/FormCardValidatorUI/FormCardValidatorUI.js




class FormCardValidate {
  get element() {
    return this.createElement();
  }
  createElement() {
    const form = new Form({
      class: "validate-form"
    }).element;
    const input = new Input({
      class: "validate-input",
      required: true,
      placeholder: "Credit card number"
    }).element;
    const button = new Button({
      class: "validate-btn",
      text: "Click to Validate",
      type: "submit"
    }).element;
    form.append(input);
    form.append(button);
    return form;
  }
}
;// ./src/utils/validators.js
function isValidCard(card, cardStart, cardLenght) {
  const regex = new RegExp(`^${cardStart}[0-9]{${cardLenght - String(cardStart).length}}$`);
  return regex.test(card);
}
function luhnCheck(input) {
  const number = input.toString();
  const digits = number.replace(/\D/g, "").split("").map(Number);
  let sum = 0;
  let isSecond = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isSecond = !isSecond;
  }
  return sum % 10 === 0;
}
;// ./src/components/widget-card-validator/WidgetCardValidator.js






class WidgetCardValidator {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.stateClass = null;
  }
  bindToDOM() {
    const heading = new Heading({
      class: "validator-title",
      text: "Validate Credit Card"
    }).element;
    const listCards = new UiCardValidator({
      data: cards_data_namespaceObject,
      class: "cards"
    }).element;
    const formCardValidatorUI = new FormCardValidate().element;
    const span = new Span({
      classes: ["message"],
      text: ""
    }).element;
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
    this.spanList.forEach(span => {
      span.classList.remove("cdisabled");
      if (!span.classList.contains(this.stateClass) && this.stateClass) {
        span.classList.add("cdisabled");
      }
    });
  }
  getValidCard(input) {
    this.stateClass = null;
    cards_data_namespaceObject.forEach(card => {
      const {
        start,
        length
      } = card.info[0];
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
;// ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const widgetCardValidator = new WidgetCardValidator(document.querySelector("#app"));
  widgetCardValidator.bindToDOM();
});
;// ./src/index.js


/******/ })()
;