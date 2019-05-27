# stack-overflow-fanatic

- https://stack-overflow-fanatic.herokuapp.com/
- https://webhook.site/#!/009d31b5-2b3c-4ae8-b061-2e3fcf3276ae

## What

A very roundabout way of getting the dreaded "Fanatic" badge on StackOverflow (Visit the site each day for 100 consecutive days). 

## Why

Because no matter how hard you try there will always come a day when your 80 day streak gets ruined by bad Wi-Fi.

## How

1. Clone this repo and use it to spin up a [Heroku](https://www.heroku.com/) app.
1. In the Heroku dashboard, under app settings create three "Config Vars": `email`, `password` and [`userid`](https://meta.stackoverflow.com/a/281255/1333383). These will be used to login to Stack Overflow.
1. Sign up for [UptimeRobot](https://uptimerobot.com/) and create a HTTP(s) monitor pointing to your app. Set the interval to 12H. This will wake Heroku Free Dynos that fall asleep after long periods of inactivity.
1. Alternatively, if you have dyno hours to spare, create a `public/wakemydyno.txt` file and submit your app to http://wakemydyno.com/ to achieve the same effect as above.
1. That's it!
