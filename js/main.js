const api = {
    key: "c34d1b2f425b6f9d971137345b237f81",
    base: "https://api.openweathermap.org/data/2.5/"
}



const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateMake(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateMake(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

/*} else {
    if (evt.keyCode == 116) {
        let long;
        let lat;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    const api = {
                        key: "c34d1b2f425b6f9d971137345b237f81 ",
                        base: "https://api.openweathermap.org/data/2.5/"
                    })
                //function getResults(query) {
                fetch(`${api.base}weather?q=${long},${lat}&units=metric&APPID=${api.key}`)
                .then(weather => {
                    return weather.json();
                }).then(displayResults);
            }
        }
    }
}*/