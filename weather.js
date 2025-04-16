const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country\\.txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date.txt')

const apiKey = '6d4f5538fdd126f22b975ca85bf6d255'


searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value)
        cityInput.value= ''
        cityInput.blur()
    }

})

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

function getWeatherIcon(id) {
    if (id >= 200 && id <= 232) return 'thunderstorm.png'; // Thunderstorm
    if (id >= 300 && id <= 321) return 'drizzle.png';       // Drizzle
    if (id >= 500 && id <= 531) return 'rain.png';          // Rain
    if (id >= 600 && id <= 622) return 'snow.png';          // Snow
    if (id >= 701 && id <= 781) return 'mist.png';          // Atmosphere
    if (id === 800) return 'clear.png';                     // Clear
    if (id >= 801 && id <= 804) return 'cloud.png';         // Clouds

    return 'cloud.png'; // Default fallback
}


function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    };
    return currentDate.toLocaleDateString('en-GB', options)
}



// add to this function --> .cod///
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200){
        showDisplaySection(notFoundSection)
        return 
    }

    const {
        name: cityName,
        sys: { country },
        main: {temp, humidity}, 
        weather: [{ id, description }],
        wind: { speed }
    } = weatherData

    countryTxt.textContent = `${cityName}, ${country}`
    tempTxt.textContent = Math.round(temp) + " °C"
    conditionTxt.textContent = description.charAt(0).toUpperCase() + description.slice(1)
    humidityValueTxt.textContent = humidity + "%"
    windValueTxt.textContent = speed + " M/s"
    
    currentDateTxt.textContent = getCurrentDate() 
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`

    await updateForecastsInfo(city) 

    showDisplaySection(weatherInfoSection)

}


async function updateForecastsInfo(city){
    const forecastsData = await getFetchData('forecast', city) 
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes())
        console.log(forecastWeather)
    })
}


function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display='none')

    section.style.display='flex'
}