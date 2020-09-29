const express = require('express');
const https = require('https');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const apiKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  let query = req.body.cityName;
  let weatherUnit = 'metric';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query},ca&units=${weatherUnit}&APPID=${apiKey}`;

  https.get(weatherUrl, (response) => {
    response.on('data', (data) => {
      let weatherData = JSON.parse(data);
      let weatherDescription = weatherData.weather[0].description;
      let temp = Math.floor(weatherData.main.temp);
      let location = weatherData.name;
      let weatherIcon = weatherData.weather[0].icon;
      let iconImageUrl = `<img src = http://openweathermap.org/img/wn/${weatherIcon}@2x.png>`;

      res.write(
        `<h1>The current weather in ${location} is ${weatherDescription} and the temperature of ${temp} degrees Celcius.</h1>`
      );
      res.write(iconImageUrl);
      res.send();
    });
  });
});

app.listen(3000, () => console.log('Server is running on port 3000.'));
