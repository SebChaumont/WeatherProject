// declaring dependencies package
const express = require('express');
const https = require('https');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
// retrieving the hidden API key from enviornment var
const apiKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  let query = req.body.cityName; // setting the query value based on the user input in index.html
  let weatherUnit = 'metric'; //todo: this could be linked to a radio button in index.html and change the weather unit served to the user.
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query},ca&units=${weatherUnit}&APPID=${apiKey}`;

  https.get(weatherUrl, (response) => {
    response.on('data', (data) => {
      let weatherData = JSON.parse(data); // saving the JSON data into a variable
      let weatherDescription = weatherData.weather[0].description; // description is part of the weather object contained inside weatherData
      let temp = Math.floor(weatherData.main.temp); // rounding temp
      let location = weatherData.name;
      let weatherIcon = weatherData.weather[0].icon; //dicon is part of the weather object contained inside weatherData
      let iconImageUrl = `<img src = http://openweathermap.org/img/wn/${weatherIcon}@2x.png>`;

      // writing first response
      res.write(
        `<h1>The current weather in ${location} is ${weatherDescription} and the temperature of ${temp} degrees Celcius.</h1>`
      );
      // writing second resonse
      res.write(iconImageUrl);
      // seding the response back to the client
      res.send();
    });
  });
});

app.listen(3000, () => console.log('Server is running on port 3000.'));
