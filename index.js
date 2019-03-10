const Browser = require("zombie");
const express = require("express");

const VISIT_INTERVAL = 23 * 60 * 60 * 1000;
const HISTORY = [];

// Stop all JS requests, easier than polyfilling zombie/jsdom
Browser.runScripts = false;

function visit() {
  const browser = new Browser();

  return browser.visit("https://stackoverflow.com/users/login", () => {
    Promise.all([
      browser.fill("email", process.env.email),
      browser.fill("password", process.env.password)
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

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (appReq, appRes) => {
  appRes.json(HISTORY);
});

app.listen(app.get('port'), function() {
  console.log('Fanatic running on port', app.get('port'));
});
