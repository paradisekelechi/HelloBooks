import {
  randomText
} from './TestData';

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
  'Signup User': (browser) => {
    browser
      .click('div[name=register]')
      .pause(5000)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 2000)
      .waitForElementVisible('button[name=signup]', 2000)
      .click('button[name=signup]')
      .pause(6000)
      .setValue('input[name=email]', `${randomText}@andela.com`)
      .click('button[name=signup]')
      .pause(6000)
      .setValue('input[name=username]', `${randomText}`)
      .click('button[name=signup]')
      .pause(6000)
      .setValue('input[name=password]', 'password')
      .click('button[name=signup]')
      .pause(2000)
      .waitForElementVisible('div[name=logout-link]', 8000)
      .waitForElementVisible('div[name=profile]', 1000)
      .waitForElementVisible('div[name=history]', 1000)
      .waitForElementVisible('div[name=books]', 1000)
      .waitForElementVisible('#book-borrow-76', 4000)
      .pause(4000);
  },
  'Borrow Book': (browser) => {
    browser
      .click('#book-borrow-76')
      .assert.containsText('button[type=button]', 'Yes, borrow it!')
      .pause(2000)
      .click('button[type=button]')
      .pause(3000);
  },
  'Borrow History': (browser) => {
    browser
      .click('div[name=history]')
      .waitForElementVisible('#book-return-76', 4000);
  },
  'Return Book': (browser) => {
    browser
      .click('#book-return-76')
      .assert.containsText('button[type=button]', 'Yes, return it!')
      .pause(2000)
      .click('button[type=button]')
      .pause(3000);
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
      .click('#save-password')
      .pause(7000)
      .setValue('input[name=password]', `${randomText}`)
      .click('#save-password')
      .pause(7000)
      .setValue('input[name=newPassword]', `${randomText}`)
      .click('#save-password')
      .pause(7000)
      .setValue('input[name=confirmPassword]', `${randomText}wrong`)
      .click('#save-password')
      .pause(7000)
      .setValue('input[name=confirmPassword]', `${randomText}`)
      .click('#save-password')
      .pause(7000)
      .click('#update-toggle')
      .pause(3000)
      .click('#update-toggle')
      .pause(3000)
      .setValue('input[name=password]', `${randomText}`)
      .setValue('input[name=newPassword]', `${randomText}`)
      .setValue('input[name=confirmPassword]', `${randomText}`)
      .pause(2000)
      .click('#save-password')
      .pause(7000)
      .click('#update-toggle')
      .pause(3000)
      .click('#update-toggle')
      .pause(3000)
      .setValue('input[name=password]', 'password')
      .setValue('input[name=newPassword]', `${randomText}`)
      .setValue('input[name=confirmPassword]', `${randomText}`)
      .pause(2000)
      .click('#save-password')
      .pause(7000);
  },
  'Logout User after signup': (browser) => {
    browser
      .click('div[name=logout-link]')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 2000)
      .waitForElementVisible('button[name=signin]', 2000);
  },
  'Signin User': (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 2000)
      .waitForElementVisible('button[name=signin]', 2000)
      .click('button[name=signin]')
      .pause(6000)
      .setValue('input[name=username]', `${randomText}`)
      .click('button[name=signin]')
      .pause(6000)
      .setValue('input[name=password]', 'password')
      .click('button[name=signin]')
      .pause(6000)
      .clearValue('input[name=password]')
      .pause(2000)
      .setValue('input[name=password]', `${randomText}`)
      .click('button[name=signin]')
      .pause(6000)
      .waitForElementVisible('div[name=logout-link]', 8000)
      .waitForElementVisible('div[name=profile]', 1000)
      .waitForElementVisible('div[name=history]', 1000)
      .waitForElementVisible('div[name=books]', 1000)
      .waitForElementVisible('#book-borrow-76', 4000)
      .pause(4000);
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
