const Browser = require("zombie");
const express = require("express");

const VISIT_INTERVAL = 12 * 60 * 60 * 1000;
const HISTORY = [];

// Stop all JS requests, easier than polyfilling zombie/jsdom
Browser.runScripts = false;

function log(status, url, err) {
  if (status === 'FAIL') {
    console.error("FAIL", err, url);
  } else {
    console.info("OK", url);
  }

  const date = (new Date()).toString();

  HISTORY.push({status, url, err, date, timestamp: Date.now()});
}

function visit() {
  const browser = new Browser();

  return browser.visit("https://stackoverflow.com/users/login", () => {
    Promise.all([
      browser.fill("email", process.env.email),
      browser.fill("password", process.env.password)
    ])
      .then(browser.pressButton("Log in"))
      .then(() => {
        log('OK', browser.location.href)
      })
      .catch(err => {
        log('FAIL', browser.location.href, err)
      });
  });
}

visit();
setInterval(visit, VISIT_INTERVAL);

const app = express();
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000);

app.get('/', (appReq, appRes) => {
  appRes.json(HISTORY);
});

app.listen(app.get('port'), function() {
  console.log('Fanatic running on port', app.get('port'));
});
