export default {
  'Landing Page': (browser) => {
    browser
      .url('http://localhost:4040')
      .pause(4000)
      .waitForElementVisible('div[name=login]', 1000)
      .waitForElementVisible('div[name=about]', 1000)
      .waitForElementVisible('div[name=books]', 1000)
      .pause(3000);
  },
  'Books Page': (browser) => {
    browser
      .click('div[name=books]')
      .pause(5000);
  },
  'About Page': (browser) => {
    browser
      .click('div[name=about]')
      .pause(3000);
  },
  'Signin User': (browser) => {
    browser
      .click('div[name=login]')
      .pause(3000)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 4000)
      .waitForElementVisible('button[name=signin]', 2000)
      .click('button[name=signin]')
      .pause(6000)
      .setValue('input[name=username]', 'kelechi222')
      .click('button[name=signin]')
      .pause(6000)
      .setValue('input[name=password]', 'password')
      .click('button[name=signin]')
      .pause(6000)
      .clearValue('input[name=username]')
      .pause(2000)
      .setValue('input[name=username]', 'kelechi')
      .click('button[name=signin]')
      .pause(6000)
      .waitForElementVisible('div[name=logout-link]', 8000)
      .waitForElementVisible('div[name=profile]', 1000)
      .waitForElementVisible('div[name=books]', 1000)
      .waitForElementVisible('#book-delete-76', 4000)
      .waitForElementVisible('#book-view-76', 4000)
      .pause(4000);
  },
  'View Book': (browser) => {
    browser
      .click('#book-view-76')
      .pause(2000);
  },
  'Books view': (browser) => {
    browser
      .click('div[name=books]')
      .pause(4000);
  },
  'Settings view': (browser) => {
    browser
      .click('div[name=settings]')
      .pause(4000);
  },
  'Dashboard Page': (browser) => {
    browser
      .click('div[name=dashboard]')
      .assert.containsText('span', 'Total Books')
      .pause(5000);
  },
  'User Profile': (browser) => {
    browser
      .click('div[name=profile]')
      .pause(3000)
      .assert.containsText('span', 'Username')
      .waitForElementVisible('#update-toggle', 4000)
      .click('#update-toggle')
      .waitForElementVisible('#password', 2000)
      .waitForElementVisible('#newPassword', 2000)
      .waitForElementVisible('#confirmPassword', 2000)
      .pause(2000)
      .click('#update-toggle')
      .pause(3000);
  },
  'Logout User after signin': (browser) => {
    browser
      .click('div[name=logout-link]')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 2000)
      .waitForElementVisible('button[name=signin]', 2000)
      .end();
  },
};
