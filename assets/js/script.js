var cityNameInput = document.querySelector("#city-name");

function searchWeather () { 
    //get value from input element
    var cityName = cityNameInput.value.trim();

    if (cityName) {
        //format the openweather geo api url
        let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +
        cityName +
        "&appid=ff9a02b937539db6bdc17cba9723e9a6"

        fetch (apiUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    var lon = data.coord.lon
                    var lat = data.coord.lat
                    //Get weather Info
                    let apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?" +
                      "lat=" + lat +
                        "&lon=" + lon +
                     "&appid=ff9a02b937539db6bdc17cba9723e9a6"
                     fetch(apiUrl2).then(function(response) {
                         if(response.ok) {
                             response.json().then(function(data2) {
                                 console.log(data2)
                             });
                         } else {
                             alert('Error: City Not Found')
                         }
                     })
                })
            } else {
                alert('Error: Location Not Found')
            }
        })
        //clear old content
        cityNameInput.valie="";
    } else {
        alert("Please enter a city name");
    }
}

document.querySelector("#search").addEventListener("submit", searchWeather)
