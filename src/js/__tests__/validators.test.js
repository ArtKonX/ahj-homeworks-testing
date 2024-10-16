import { isValidCard, luhnCheck } from "../../utils/validators";

describe("Проверка функций isValidCard и luhnCheck", () => {
  test.each([
    { card: 12345678910113, cardStart: 14, cardLenght: 14, expected: false },
    { card: 12345678910113, cardStart: 12, cardLenght: 14, expected: true },
    { card: 12345678910113, cardStart: 12, cardLenght: 15, expected: false },
  ])(
    "Проверка isValidCard($card, $cardStart, $cardLenght)",
    ({ card, cardStart, cardLenght, expected }) => {
      expect(isValidCard(card, cardStart, cardLenght)).toBe(expected);
    },
  );

  test.each([
    { inputValue: 12345678910113, expected: true },
    { inputValue: "11111", expected: false },
    { inputValue: "12345678910113", expected: true },
    { inputValue: "010101", expected: false },
  ])("Проверка luhnCheck($inputValue)", ({ inputValue, expected }) => {
    expect(luhnCheck(inputValue)).toBe(expected);
  });
});
