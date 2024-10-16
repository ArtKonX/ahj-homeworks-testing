import WidgetCardValidator from "../components/widget-card-validator/WidgetCardValidator";

document.addEventListener("DOMContentLoaded", () => {
  const widgetCardValidator = new WidgetCardValidator(
    document.querySelector("#app"),
  );
  widgetCardValidator.bindToDOM();
});
