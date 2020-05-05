'use strict'; // eslint-disable-line

const toJSON = (response) => response.json();

const formWeatherRef = document.querySelector('form');
const buttonSubmit = document.querySelector('.btn');
const messageOneRef = document.querySelector('.message-1');
const messageTwoRef = document.querySelector('.message-2');

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const address = formWeatherRef.search.value.trim();
  messageOneRef.textContent = 'Loading…';
  messageTwoRef.textContent = '';
  buttonSubmit.disabled = true;

  fetch(`/weather?address=${address}`)
    .then(toJSON)
    .then(({ error, forecast, location }) => {
      if (error) {
        messageOneRef.textContent = error;
      } else {
        messageOneRef.textContent = location;
        messageTwoRef.textContent = forecast;
      }

      buttonSubmit.disabled = false;
    })
    .catch((err) => {
      messageOneRef.textContent = err.message;
      buttonSubmit.disabled = false;
    });
};

formWeatherRef.addEventListener('submit', handleFormSubmit);
