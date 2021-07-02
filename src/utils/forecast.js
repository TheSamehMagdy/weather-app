const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=420bb3e378573914d379c12d2853bb66`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.');
		} else if (body.message) {
			callback(body.message);
		} else {
			const weatherData = body;
			const forecastString = `${weatherData.weather[0].main}. It is currently ${weatherData.main
				.temp} degrees in ${weatherData.name}.

				The high today is ${weatherData.main.temp_max} and the low is ${weatherData.main.temp_min}.`;
			callback(undefined, forecastString);
		}
	});
};

module.exports = forecast;
