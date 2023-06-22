var form = document.getElementById('search-bar');
var searchInput = document.getElementById('search-input');
var currentWeather = document.getElementById('current-weather');
var forecast = document.getElementById('forecast');
var historyDiv = document.getElementById('history');
var API_KEY = '1c8009e235c98cf3fcc7bbe9317eab5a';

var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

window.onload = function() {
    searchHistory.forEach(function(city) {
        var button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', function() {
            loadWeather(city);
        });
        historyDiv.appendChild(button);
    });
}

form.addEventListener('submit', event => {
    event.preventDefault();

    var cityName = searchInput.value;

    if (cityName) {
        searchHistory.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        var button = document.createElement('button');
        button.textContent = cityName;
        button.addEventListener('click', function() {
            loadWeather(cityName);
        });
        historyDiv.appendChild(button);

        loadWeather(cityName);
    } else {
        alert('Please enter a city name');
    }
});   
    function loadWeather(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            currentWeather.innerHTML = '';

            var h2 = document.createElement('h2');
            h2.textContent = "Current Weather in " + data.name;

            var temp = document.createElement('p');
            temp.textContent = "Temperature: " + data.main.temp;

            var humidity = document.createElement('p');
            humidity.textContent = "Humidity: " + data.main.humidity;

            var wind = document.createElement('p');
            wind.textContent = "Wind Speed: " + data.wind.speed;

            currentWeather.appendChild(h2);
            currentWeather.appendChild(temp);
            currentWeather.appendChild(humidity);
            currentWeather.appendChild(wind);

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);
        })
        .then(response => response.json())
        .then(data => {
            forecast.innerHTML = '';

            var h2 = document.createElement('h2');
            h2.textContent = '5-Day Forecast';
            forecast.appendChild(h2);

            for (var i = 0; i < data.list.length; i += 8) {
                var div = document.createElement('div');

                var h3 = document.createElement('h3');
                h3.textContent = data.list[i].dt_txt;
                div.appendChild(h3);

                var temp = document.createElement('p');
                temp.textContent = "Temperature: " + data.list[i].main.temp;
                div.appendChild(temp);

                var humidity = document.createElement('p');
                humidity.textContent = "Humidity: " + data.list[i].main.humidity;
                div.appendChild(humidity);

                var wind = document.createElement('p');
                wind.textContent = "Wind Speed: " + data.list[i].wind.speed;
                div.appendChild(wind);

                forecast.appendChild(div);

            }
        })
        .catch(err => {
            console.error(err);
            alert('Failed to fetch weather data');
        });
    }