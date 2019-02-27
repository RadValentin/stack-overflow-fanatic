const { email, password } = require("./config.json");
const Browser = require("zombie");

const VISIT_INTERVAL = 23 * 60 * 60 * 1000;
const HISTORY = [];

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
        console.info("OK", browser.location.href);
        HISTORY.push("OK", browser.location.href);
      })
      .catch(err => {
        HISTORY.push("FAIL", err, browser.location.href);
        console.error("FAIL", err, browser.location.href);
      });
  });
}

visit();
setInterval(visit, VISIT_INTERVAL);
