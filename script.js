var form = document.getElementById('search-bar');
var searchInput = document.getElementById('search-input');
var currentWeather = document.getElementById('current-weather');
var forecast = document.getElementById('forecast');

form.addEventListener('submit', event => {
    event.preventDefault();

    var cityName = searchInput.value;

    if (cityName) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={API_KEY}`)
        .then(response => response.json())
        .then(data => {
            currentWeather.innerHTML = ''
        })
    }
})