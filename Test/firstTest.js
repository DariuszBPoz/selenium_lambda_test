const { Builder, By, Key } = require("selenium-webdriver");
const { describe } = require("mocha");
(async () => {
  var chai = await import("chai");
  let should = chai.should();
})();

//describle block
describe("Add todo tests", function () {
  //it block
  it("succesfully adds a todo to application", async function () {
    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

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

    //close the browser
    await driver.quit();
  });
});
