const Browser = require("zombie");
const express = require("express");

const STATUS = {
  FAIL: "FAIL",
  OK: "OK"
};
const VISIT_INTERVAL = 12 * 60 * 60 * 1000;
const HISTORY = [];

// Stop all JS requests, easier than polyfilling zombie/jsdom
Browser.runScripts = false;

function log(status, url, err) {
  if (status === STATUS.FAIL) {
    console.error(STATUS.FAIL, err, url);
  } else {
    console.info(STATUS.OK, url);
  }

  const date = new Date().toString();
  const logData = { status, url, err, date, timestamp: Date.now() };

  HISTORY.push(logData);
}

function visit() {
  const browser = new Browser();

  return browser.visit("https://stackoverflow.com/users/login", async () => {
    console.log(
      "Attempting login with:",
      process.env.email,
      process.env.password
    );

    try {
      await Promise.all([
        browser.fill("email", process.env.email),
        browser.fill("password", process.env.password)
      ]);
      await browser.pressButton("#submit-button");
      await browser.clickLink(".my-profile");

      if (browser.location.href.includes(process.env.userid)) {
        log(STATUS.OK, browser.location.href);
      } else {
        log(STATUS.FAIL, browser.location.href, err);
      }
    } catch (err) {
      log(STATUS.FAIL, browser.location.href, err);
    }
  });
}

visit();
setInterval(visit, VISIT_INTERVAL);

const app = express();
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);

app.get("/", (appReq, appRes) => {
  appRes.json(HISTORY);
});

app.listen(app.get("port"), function() {
  console.log("Fanatic running on port", `http://localhost:${app.get("port")}`);
});
