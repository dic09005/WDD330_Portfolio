/* 
View - The View functions encapsulate the html, css view of the application.  
Any time you want to manipulate the screen, the functions live here as do the 
references to the DOM objects. */

function toggleMenu() {

    document.getElementById('primaryNav').classList.toggle('open');
    document.getElementById('hamburgerBtn').classList.toggle('open');
}

function setTimestamp() {
    date = new Date().getFullYear();
    document.querySelector("#year").innerHTML = date
    document.querySelector("#timestamp").innerHTML = document.lastModified; 
}

setTimestamp()

/*******************************************************/
//  Pull User Input and return Weather Data for Location
/*******************************************************/

function saveValue() {
    // Get the input element
    let input = document.getElementById("zipcode");
  
    // Get the value of the input element
    let value = input.value;
  
    // Do something with the value, like store it in a variable
    let savedValue = value;
  
    // Build custom URL for apifetch
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const endUrl = ',us&appid=70aed8e395b7c27059000e7c513b0ed6&units=imperial';
    const url = `${baseUrl}${savedValue}${endUrl}`;
  
  
    const zip = document.querySelector('#zip');
    const city = document.querySelector('#city');
    const weatherIcon = document.querySelector('#weather-icon');
    const temp = document.querySelector('#temp');
    const feels_like = document.querySelector('#feelslike');
    const description = document.querySelector('#description');
    const humidity = document.querySelector('#humidity');
    
    async function apiFetch() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          //console.log(data);
          displayResults(data);
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
          console.log(error);
    }
  }
    apiFetch();
  
    // Display Weather and Map 
    function  displayResults(weatherData) {
      zip.innerHTML = `<strong>Zip Code: ${savedValue}</strong>`;
      city.innerHTML = `<strong>City Name: ${weatherData.name}</strong>`;
      temp.innerHTML = `<strong>Current Temp: ${weatherData.main.temp.toFixed(0)}°</strong>`;
      feels_like.innerHTML = `<strong>Feels Like: ${weatherData.main.feels_like.toFixed(0)}°</strong>`;
      description.innerHTML = `<strong>Discription: ${weatherData.weather[0].description}</strong>`;
      humidity.innerHTML = `<strong>Humidity: ${weatherData.main.humidity.toFixed(0)}%</strong>`;
      
      const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const desc = weatherData.weather[0].description;
  
      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', desc);
    }

    // Forecast with user input location Weather API

    // select HTML elements in the document

    const date1 = document.querySelector('#date1');
    const forecast1 = document.querySelector('#forecast1');
    const forcastFL1 = document.querySelector('#forcastFL1');
    const forecastDesc1 = document.querySelector('#forecastDesc1');
    const forecastHum1 = document.querySelector('#forecastHum1');

    const date2 = document.querySelector('#date2');
    const forecast2 = document.querySelector('#forecast2');
    const forcastFL2 = document.querySelector('#forcastFL2');
    const forecastDesc2 = document.querySelector('#forecastDesc2');
    const forecastHum2 = document.querySelector('#forecastHum2');

    const date3 = document.querySelector('#date3');
    const forecast3 = document.querySelector('#forecast3');
    const forcastFL3 = document.querySelector('#forcastFL3');
    const forecastDesc3 = document.querySelector('#forecastDesc3');
    const forecastHum3 = document.querySelector('#forecastHum3');

    // Call API

    const baseUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
    const endUrl2 = '&appid=70aed8e395b7c27059000e7c513b0ed6&units=imperial';
    const url2 = `${baseUrl2}${savedValue}${endUrl2}`;

    async function apiFetch2() {
        try {
          const response = await fetch(url2);
          if (response.ok) {
            const data2 = await response.json();
            //console.log(data2); 
            displayForcastResults(data2);
          } else {
              throw Error(await response.text());
          }
        } catch (error) {
            console.log(error);
        }
      }
      
      apiFetch2();

    // Display the Results for the forecast

    function  displayForcastResults(weatherData2) {      
      date1.innerHTML = `<strong>${weatherData2.list[4].dt_txt.slice(0, 10)}</strong>`;
      forecast1.innerHTML = `Temp: <strong>${weatherData2.list[4].main.temp.toFixed(0)}°</strong>`;
      forcastFL1.innerHTML = `Feels Like: <strong>${weatherData2.list[4].main.feels_like.toFixed(0)}°</strong>`;
      forecastDesc1.innerHTML = `Description: <strong>${weatherData2.list[4].weather[0].description}</strong>`;
      forecastHum1.innerHTML = `Humidity: <strong>${weatherData2.list[4].main.humidity.toFixed(0)}°</strong>`;

      date2.innerHTML = `<strong>${weatherData2.list[12].dt_txt.slice(0, 10)}</strong>`;
      forecast2.innerHTML = `Temp: <strong>${weatherData2.list[12].main.temp.toFixed(0)}°</strong>`;
      forcastFL2.innerHTML = `Feels Like: <strong>${weatherData2.list[12].main.feels_like.toFixed(0)}°</strong>`;
      forecastDesc2.innerHTML = `Description: <strong>${weatherData2.list[12].weather[0].description}</strong>`;
      forecastHum2.innerHTML = `Humidity: <strong>${weatherData2.list[12].main.humidity.toFixed(0)}°</strong>`;

      date3.innerHTML = `<strong>${weatherData2.list[20].dt_txt.slice(0, 10)}</strong>`;
      forecast3.innerHTML = `Temp: <strong>${weatherData2.list[20].main.temp.toFixed(0)}°</strong>`;
      forcastFL3.innerHTML = `Feels Like: <strong>${weatherData2.list[20].main.feels_like.toFixed(0)}°</strong>`;
      forecastDesc3.innerHTML = `Description: <strong>${weatherData2.list[20].weather[0].description}</strong>`;
      forecastHum3.innerHTML = `Humidity: <strong>${weatherData2.list[20].main.humidity.toFixed(0)}°</strong>`;

    }

  }

