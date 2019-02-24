const {email, password} = require("./config.json");
const Browser = require("zombie");

// Stop all JS requests, easier than polyfilling zombie/jsdom
Browser.runScripts = false;
const browser = new Browser();

browser.visit("https://stackoverflow.com/users/login", () => {
  Promise.all([
    browser.fill("email", email),
    browser.fill("password", password)
  ])
    .then(browser.pressButton("Log in"))
    .then(() => {
      console.log("OK", browser.location.href);
    })
    .catch(err => console.log(err));
});
