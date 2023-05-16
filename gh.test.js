const { clickElement, getText} = require("./lib/commands.js");
let page;
beforeEach(async () => {
  let day = 4;
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php"); 
  await clickElement(page, `body > nav > a:nth-child(${day}) > span.page-nav__day-week`);
  await clickElement(page, "body > main > section > div.movie-seances__hall > ul > li > a");
}, 30000);

afterEach(() => {
  page.close();
});
describe("Booking",() => {
  test("Booking one ticket", async () => {
    let row = 4;
    let place1 = 4;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
    await clickElement(page,"body > main > section > button");
    await clickElement(page,"p.ticket__hint:nth-child(9)");
    const actual = await getText(page,"h2");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  }, 30000);

  test("Booking two tickets", async () => {
    let row = 3;
    let place2 = 5;
    let place3 = 6;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place2})`);
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place3})`);
    await clickElement(page,"body > main > section > button");
    await clickElement(page,"p.ticket__hint:nth-child(9)");
    const actual = await getText(page,"h2");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  }, 30000);

  test("Booking someone else's seat", async () => {
    let row = 2;
    let place4 = 2;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place4})`);
    const expected = await page.$eval("body > main > section > button",(el) => el.disabled
    );
    expect(expected).toEqual(true);
  }, 30000);
})
