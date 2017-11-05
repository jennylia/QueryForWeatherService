var express = require('express');
var request = require('request');
var app = express();
const apiKey = '3d86fd1c772eefd96c501522e55d2b98';

app.get('/', function(req, res) {
	// console.log(req);
	var cityParam = req.query;
	console.log(cityParam['city']);
	var city = cityParam['city'];
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if (err) {
            res.send({
                "Output": "Error"
            });
        } else {
            var weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.send({
                    "Output": "Error"
                });
            } else {
                console.log(weather);
                var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.send({
                    "Output": weatherText
                });
            }
        }
    });
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
