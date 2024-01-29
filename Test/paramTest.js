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

  //grid url
  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

  //application url
  const todoEndPoint = "http://lambdatest.github.io/sample-todo-app";

  browsers = [
    { browser: "Chrome", bVersion: "121.0", os: "Windows 11" },
    { browser: "Firefox", bVersion: "121.0", os: "Windows 11" },
    { browser: "Firefox", bVersion: "120.0", os: "Windows 11" },
  ];

  browsers.forEach(({ browser, bVersion, os }) => {
    //it block
    it(`succesfully adds a todo for browser ${browser}, ${bVersion}, ${os}`, async function () {
      ltCapabilities.capabilities["LT:Options"].platformName = os;
      ltCapabilities.capabilities.browserName = browser;
      ltCapabilities.capabilities.browserVersion = bVersion;

      ltCapabilities.capabilities["LT:Options"].name = this.test.title;

      driver = new Builder()
        .usingServer(gridUrl)
        .withCapabilities(ltCapabilities.capabilities)
        .build();

      //navigate to our website
      await driver.get(todoEndPoint);

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

      await driver.quit();
    });
  });
});
