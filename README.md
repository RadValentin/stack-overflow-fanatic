# stack-overflow-fanatic

## Usage

1. Clone this repo and use it to spin up a [Heroku](https://www.heroku.com/) app.
1. In the Heroku dashboard, under app settings create two "Config Vars": `email` and `password`. These will be used to login to Stack Overflow.
1. Sign up for [UptimeRobot](https://uptimerobot.com/) and create a HTTP(s) monitor pointing to your app. Set the interval to 12H. This will wake Heroku Free Dynos that fall asleep after long periods of inactivity.
1. Alternatively, if you have dyno hours to spare, create a `public/wakemydyno.txt` file and submit you app to http://wakemydyno.com/ to achieve the same effect as above.
1. That's it!
