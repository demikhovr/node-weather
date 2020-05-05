const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=35409fef9549002a1c77be06fb61f1b8&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location!');
    } else {
      const data = body.current;
      const string = `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`;
      callback(undefined, string);
    }
  });
};

module.exports = forecast;
