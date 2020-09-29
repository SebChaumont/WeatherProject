const express = require('express');
const https = require('https');
require('dotenv').config();
const app = express();
const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
  const weatherGetUrl = `https://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&units=metric&APPID=${apiKey}`;
  https.get(weatherGetUrl, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      let weatherData = JSON.parse(data);
      let weatherDescription = weatherData.weather[0].description;
      let temp = Math.floor(weatherData.main.temp);

      console.log(`The current weather is ${weatherDescription}.`);
    });
  });

  res.send('Server is up and running.');
});

app.listen(3000, () => console.log('Server is running on port 3000.'));
