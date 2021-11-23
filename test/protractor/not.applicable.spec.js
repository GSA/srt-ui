// spec.js
const {browser, element} = require('protractor')

function clickRoute(route) {
  browser.executeScript('document.querySelector(\'[ng-reflect-router-link="'+route+'"]\').click();').catch(r => console.log(r));
}


describe('Not Applicable should be user togglable', function() {

  it ('should login', function () {
    browser.get('http://localhost:4200/');
    element(by.xpath("//button[contains(.,'Login with MAX')]")).click();
  // })
  //
  // it('should let users change a solicitation to NA', async function() {
  //   browser.get('http://localhost:4200/');

    expect(element(by.xpath("//a[contains(.,'Hello'')]")).isPresent).toBeTruthy();

    clickRoute("/solicitation/report");

    element(by.cssContainingText('option', 'BeaverBox Testing')).click();


  });



});

