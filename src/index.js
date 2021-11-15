import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { checkInput } from './weather.js';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    // const city = $('#location').val();
    const userInput = $('#location').val();
    $('#location').val("");

    try {
      const invalidLocation = checkInput(userInput);
      if (invalidLocation instanceof Error) {
        console.error(invalidLocation.message);
        throw TypeError("Not a valid location!");
      } else {
        console.log("Try was successful, so no need to catch!");
        $('#displayLocation').text("This location is valid. You may continue.");
      }
    } catch (error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${userInput},US&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${userInput} is ${response.list[0].main.humidity}% `);
      $('.showTemp').text(`The temperature in Fahrenheit is ${response.list[0].main.temp} degrees.`);
      $('.showPressure').text(`The pressure is ${response.list[0].main.pressure}.`);
      $('.showLocation').text(`The location is ${response.city.name}.`);
    }
  });
});