// spec.js

/**
 * This test assumes that there is a 60 second session timeout. Not the normal case.
 * You can run this with the testsession.sh script
 */

const protractor = require('protractor')

const {browser, element} = require('protractor')

function clickRoute(route) {
  browser.executeScript('document.querySelector(\'[ng-reflect-router-link="'+route+'"]\').click();').catch(r => console.log(r));
}

describe('SRT App', function() {

  it('should timeout ', async function(done) {

    if ( process.env.VERY_LONG_TESTS ) {

      browser.get('http://localhost:4200/');
      browser.waitForAngular();

      let el2 = element(by.xpath("//button[contains(.,'Login with MAX')]"))
      expect(el2.isDisplayed()).toBeTruthy();

      element(by.xpath("//button[contains(.,'Login with MAX')]")).click();

      let EC = protractor.ExpectedConditions;
      await browser.wait(EC.urlContains('home'), 15000);
      expect(element(by.xpath("//a[contains(.,'Hello'')]")).isDisplayed).toBeTruthy();

      // session length expected to be 60 seconds with a 15 second individual token timeout
      clickRoute("/solicitation/report");
      await browser.sleep(12000);
      // console.log("12 seconds in");
      clickRoute("/solicitation/feedback");
      await browser.sleep(12000);
      // console.log("24 seconds in");
      clickRoute("/solicitation/report");
      await browser.sleep(12000);
      // console.log("36 seconds in");
      clickRoute("/solicitation/feedback");
      await browser.sleep(12000);
      // console.log("48 seconds in");
      clickRoute("/solicitation/report");
      await browser.sleep(13000);
      // console.log("61 seconds in");
      // console.log("checking for timeout now")

      expect(element(by.xpath("//button[contains(.,'Login with MAX')]")).isDisplayed()).toBeTruthy();
    }

    done();


  }, 100000);

});

