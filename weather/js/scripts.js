/* functions */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function ordinal_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function formatDate(date, type = null) {

    if (type == null) {
        type = 'ordinal'
    }
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (type == 'ordinal') {
        return `${weekdays[date.getDay()]}, ${month[date.getMonth()]} ${ordinal_of(date.getDate())} ${date.getFullYear()}`;
    } else {
        return `${weekdays[date.getDay()]},  ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
    }
}

function toggleMenu(e) {
    const menu = document.querySelector('#menu-list');
    if (window.getComputedStyle(menu, null).height == '0px') {
        menu.style['max-height'] = "999px";
    } else {
        menu.style['max-height'] = "0px";
    }
    e.classList.toggle("change");
}
const calcWindChill = (temperature, windSpeed) => parseFloat(35.74 + (0.6215*temperature) - (35.75*(windSpeed**0.16)) + (0.4275*temperature*(windSpeed**0.16))).toFixed(2);
/* Variables */
const date = new Date();

/* Pancakes Info */

if(date.getDay() === 5) document.querySelector("#pancakes").style.display = "block";
/* Hero Information */

const todayDiv = document.querySelector('.show-today');

todayDiv.textContent = formatDate(date);

/* Load Weather Info */

const weatherDiv = document.querySelector('.show-weather');
const weatherIconDiv = document.querySelector('.weather-icon');
const weatherIcon = document.querySelector('.weather-icon-image');
var request = new XMLHttpRequest();

// Open a new Connection and get Data
request.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=42.09699837220583&lon=-111.87595677773281&units=imperial&appid=c50b2a933706495fab439a581827e04e', true);

request.onload = function () {
    const data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        //  Today

        console.log(data);
        const current = data.current;
        const today = data.daily[0];
        weatherDiv.innerHTML = `
            <ul>
                <li><strong>Current:</strong> ${current.temp}ºF</li>
                <li><strong>Max:</strong> ${today.temp.max}ºF</li>
                <li><strong>Min:</strong> ${today.temp.min}ºF</li>
                <li><strong>Wind Speed:</strong> ${current.wind_speed}mph</li>
                <li><strong>Wind Chill:</strong> ${calcWindChill(current.temp, current.wind_speed)}Fº</li>
                <li><strong>Weather:</strong> ${ current.weather[0].description }</li>
            </ul>`
        weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        weatherIcon.style.display = "inline-block";
        weatherIconDiv.style.display = "inline-block";


        // Tomorrow Foward

        for (let i = 1; i <= 5; i++) {
            let day = data.daily[i];
            const dayTemp = document.querySelector(`.temp-day-${i}`);
            const dayMax = document.querySelector(`.max-day-${i}`);
            const dayMin = document.querySelector(`.min-day-${i}`);
            const dayWind = document.querySelector(`.wind-day-${i}`);
            const dayWeather = document.querySelector(`.weather-day-${i}`);
            const dayWeatherIcon = document.querySelector(`.day-${i}-icon`);
            const dayWindChill = document.querySelector(`.wind-chill-day-${i}`);

            dayTemp.textContent = `${day.temp.day}ºF`;
            dayMax.textContent = `${day.temp.min}ºF`;
            dayMin.textContent = `${day.temp.max}ºF`;
            dayWind.textContent = `${day.wind_speed}mps`;
            dayWindChill.textContent = `${calcWindChill(day.temp.day, day.wind_speed)}ºF`
            dayWeather.textContent = `${day.weather[0].description}`;
            dayWeatherIcon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            dayWeatherIcon.style.display = "block";
        }
    } else {
        weatherDiv.textContent = `Failed to get Weather Info..`;
    }
}
// Send Request 

request.send();

/* Forecast Days */

const day1 = document.querySelector('.forecast-day-1');
const day2 = document.querySelector('.forecast-day-2');
const day3 = document.querySelector('.forecast-day-3');
const day4 = document.querySelector('.forecast-day-4');
const day5 = document.querySelector('.forecast-day-5');

day1.textContent = formatDate(date.addDays(1));
day2.textContent = formatDate(date.addDays(2));
day3.textContent = formatDate(date.addDays(3));
day4.textContent = formatDate(date.addDays(4));
day5.textContent = formatDate(date.addDays(5));

/* Footer */
const lastUpdated = document.querySelector('#lastUpdated');
lastUpdated.textContent = `Last Updated: ${formatDate(new Date(document.lastModified), 'other')}`

const footerYear = document.querySelector('#footerYear');
footerYear.textContent = date.getFullYear();