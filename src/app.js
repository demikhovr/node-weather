const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PORT = process.env.PORT || 3000;
const name = 'demikhovr';

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    name,
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name,
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    name,
    title: 'Help',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  return geocode(address, (geocodeError, { latitude, location, longitude } = {}) => {
    if (geocodeError) {
      return res.send({ error: geocodeError });
    }

    return forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error: forecastError });
      }

      return res.send({
        address,
        forecast: forecastData,
        location,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found.',
    name,
    title: '404',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    name,
    title: '404',
  });
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
