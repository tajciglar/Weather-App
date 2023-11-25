const submit = document.getElementById('searchButton');
console.log(submit)
submit.addEventListener('click', async (event) =>{
    event.preventDefault();
    
    
    const input = document.getElementById('location');
    const inputValue = input.value;
    if (!inputValue) {
        input.setCustomValidity('Please enter a city');
        input.reportValidity();
    }

    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=71aebacfba64475b849182341232411&q=' + inputValue, {mode:'cors'});

        if (!response.ok) {
            throw new Error(`Could not get data. Status: ${response.status}`);
        }
        const weatherData = await response.json();
        getData(weatherData);
    } catch (error) {
        console.log('An error occured', error);
    }
});

function getData (data) {
    const countryName = data.location.country;
    const cityName = data.location.name;
    const tempCelsius = data.current.temp_c;
    const feelsLikeCelsius = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const wind = data.current.gust_kph;

    const infoArray = [];
    infoArray.push(countryName, cityName, tempCelsius, feelsLikeCelsius, humidity, wind);
    const nameArray = ['Country name:', 'City name:', 'Temperature:', 'Feels like:', 'Humidity:', 'Wind:']; 
    showOnScreen(infoArray, nameArray);
}

function showOnScreen(info, name) {
    const mainContainer = document.getElementById('main');
    const exists = document.getElementById('infoContainer');
    if (exists) {
        mainContainer.removeChild(exists);
    }
    const infoContainer = document.createElement('div');
    mainContainer.appendChild(infoContainer);
    infoContainer.setAttribute('id', 'infoContainer');
    
    // Iterate over both arrays simultaneously
    for (let i = 0; i < info.length; i++) {
        const p = document.createElement('p');
        infoContainer.appendChild(p);
        p.textContent = `${name[i]} ${info[i]}`;
    }
}





