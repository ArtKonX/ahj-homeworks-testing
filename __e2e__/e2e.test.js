import puppetteer from "puppeteer";

jest.setTimeout(30000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;

  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {

    browser = await puppetteer.launch({
      headless: false,
      slowMo: 250,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Тест ввода валидного номера карты", async () => {
    await page.goto(baseUrl);

    await page.type(".validate-input", "5555555555554444");

    await page.click(".validate-btn");

    await page.waitForSelector(".message.valid");

    const message = await page.$eval(".message", (el) => el.textContent);

    expect(message).toBe("This card - mastercard is valid");
  });

  test("Тест ввода невалидного номера карты", async () => {
    await page.goto(baseUrl);

    await page.type(".validate-input", "155555554444");

    await page.click(".validate-btn");

    await page.waitForSelector(".message.invalid");

    const message = await page.$eval(".message", (el) => el.textContent);

    expect(message).toBe("This card is not valid");
  });
});
