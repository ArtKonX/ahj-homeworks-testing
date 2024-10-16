import puppetteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(5000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: true,
      // slowMo: 250,
      // devtools: false,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
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
