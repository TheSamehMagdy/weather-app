const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebards and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicPath));

// Define routes
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Sameh Magdy'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Sameh Magdy'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Sameh Magdy'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address.'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastString) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location: location,
				forecast: forecastString
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 Not Found',
		name: 'Sameh Magdy',
		error: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 Not Found',
		name: 'Sameh Magdy',
		error: 'Page not found'
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
