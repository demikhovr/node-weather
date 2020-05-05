const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVtaWtob3ZyIiwiYSI6ImNrOWppYjFlYTA3bnMzbHBpbWw1M3IwdXIifQ.v7NYHE3bMkNc0UMGLemOwA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (!body.features || !body.features.length) {
      callback('Unable to find location. Try another search!');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
