const { Builder, By, Key } = require("selenium-webdriver");
const ltCapabilities = require("../capabilities");
const { describe } = require("mocha");
(async () => {
  var chai = await import("chai");
  let should = chai.should();
})();

//describle block
describe("Add another todo tests", function () {
  var driver;

//username
const USERNAME = ltCapabilities.capabilities["LT:Options"].username;

//key
const KEY = ltCapabilities.capabilities["LT:Options"].accessKey;

//host
const GRID_HOST = "hub.lambdatest.com/wd/hub";

const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

beforeEach(function(){
  ltCapabilities.capabilities["LT:Options"].name = this.currentTest.title;
  driver = new Builder()
  .usingServer(gridUrl)
  .withCapabilities(ltCapabilities.capabilities)
  .build();
});

afterEach(async function(){
  await driver.quit();
});

  //it block
  it("succesfully adds another todo to application", async function () {
    // launch the browser
    // let driver = await new Builder().forBrowser("chrome").build();

    // navigate to the website
    await driver.get("http://lambdatest.github.io/sample-todo-app");

    //add a todo
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn Selenium", Key.RETURN);

    //assert
    let todoText = await driver
      .findElement(By.xpath("//li[last()]"))
      .getText()
      .then(function (value) {
        return value;
      });

    //assert using chai should
    todoText.should.equal("Learn Selenium");

  });
  it("Adding a new test for reporting", async function () {
    // launch the browser
    // let driver = await new Builder().forBrowser("chrome").build();

    // navigate to the website
    await driver.get("http://lambdatest.github.io/sample-todo-app");

    //add a todo
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn JavaScript", Key.RETURN);

    //assert
    let todoText = await driver
      .findElement(By.xpath("//li[last()]"))
      .getText()
      .then(function (value) {
        return value;
      });

    //assert using chai should
    todoText.should.equal("Learn JavaScript");

  });
});
