const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {clickElement, getText } = require("../../lib/commands.js");



Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("юзер находится на странице {string}", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("юзер возвращается на страницу {string}", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("юзер выбирает {int}-й день", async function (int) {
        return await clickElement(this.page, `body > nav > a:nth-child(${int}) > span.page-nav__day-week`);
});
When("юзер выбирает время", async function () {
  return await clickElement(this.page, "[data-seance-id='156'");
});

When("юзер выбирает {int}-й ряд {int} место", async function (int1, int2) {
  await clickElement(
    this.page,
    `div.buying-scheme__wrapper > div:nth-child(${int1}) > span:nth-child(${int2})`
  );
  await clickElement(this.page,".acceptin-button");
 
});
When("юзер выбирает {int}-й ряд {int},{int} место", async function (int1, int2, int3) {
  await clickElement(
    this.page,
    `div.buying-scheme__wrapper > div:nth-child(${int1}) > span:nth-child(${int2})`
  );
  await clickElement(
    this.page,
    `div.buying-scheme__wrapper > div:nth-child(${int1}) > span:nth-child(${int3})`
  );
  await clickElement(this.page,".acceptin-button");
 
});
When("юзер повторно выбирает {int}-й ряд {int} место", async function (int1, int2) {
  await clickElement(
    this.page,
    `div.buying-scheme__wrapper > div:nth-child(${int1}) > span:nth-child(${int2})`
  );

 
});
When("юзер нажимает Получить код бронирования", async function () {
  await clickElement(this.page,".acceptin-button");
});

Then("юзер видит сообщение Вы выбрали билеты:", async function () {
  const actual = await getText(this.page,"h2");
    const expected = "Вы выбрали билеты:";
    expect(actual).contain(expected);
});

Then("кнопка Забронировать не активна", async function () {
  const button = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(button).equal(true);
});