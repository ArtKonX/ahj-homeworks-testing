import Form from "../../ui/Form/Form";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import "./formCardValidatorUI.css";

export default class FormCardValidate {
  get element() {
    return this.createElement();
  }

  createElement() {
    const form = new Form({ class: "validate-form" }).element;
    const input = new Input({
      class: "validate-input",
      required: true,
      placeholder: "Credit card number",
    }).element;
    const button = new Button({
      class: "validate-btn",
      text: "Click to Validate",
      type: "submit",
    }).element;

    form.append(input);
    form.append(button);

    return form;
  }
}
