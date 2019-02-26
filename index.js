const { email, password } = require("./config.json");
const Browser = require("zombie");

const visitInterval = 23 * 60 * 60 * 1000;

// Stop all JS requests, easier than polyfilling zombie/jsdom
Browser.runScripts = false;

function visit() {
  const browser = new Browser();

  return browser.visit("https://stackoverflow.com/users/login", () => {
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
}

visit();
setInterval(visit, visitInterval);