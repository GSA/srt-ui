// spec.js
const {browser, element} = require('protractor')

describe('SRT App', function() {
  it('should have a login page', function() {
    browser.get('http://localhost:4200/');
    expect(browser.getTitle()).toEqual('Solicitation Review Tool');
    expect(element(by.xpath("//button[contains(.,'Login with MAX')]")).getText()).toContain('Login')
  });

});

