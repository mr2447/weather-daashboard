var cityNameInput = document.querySelector("#city-name");
var citySearchTerm = document.querySelector("#weather-search-term")
var weatherContainer = document.querySelector("#weather-container")
var tempCurrentDisplay = document.querySelector("#temp-current");


function searchWeather (event) { 
    event.preventDefault();
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
                    console.log(data)
                    var lat = data[0].lat
                    var lon = data[0].lon
                    console.log(lat)
                    console.log(lon)
                    //Get weather Info
                    let apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?" +
                      "lat=" + lat +
                        "&lon=" + lon + 
                        "&units=metric" +
                     "&appid=ff9a02b937539db6bdc17cba9723e9a6"
                     fetch(apiUrl2).then(function(response2) {
                         if(response2.ok) {
                             response2.json().then(function(data2) {
                                 console.log(data2)
                                 console.log(data2.daily)
                                 displayWeather(data2.timezone, data2.daily)
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

let displayWeather = function (searchTerm, daily) {
    weatherContainer.textContent = "";
    //convert time 
    let timestamp = daily[0].dt;
    let date = new Date(timestamp * 1000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    let formattedTime = day + "/" + month + '/' + year;


    //display search city name 
    citySearchTerm.textContent = searchTerm + " " + formattedTime
    //display current temperature 
    console.log(tempCurrentDisplay)
    //find temp value
    let tempValueCu = daily[0].temp.day;
    console.log(tempValueCu)
    //input value 
    tempCurrentDisplay.textContent = tempValueCu;

    // for (var i = 0; i < daily.length; i++) {
    //     //find temp 
    //     let tempValue = daily[i].temp.day;
    //     //create p element for temperature
    //     let tempContainer = document.createElement("p");
    //     //set textContent to temp
    //     tempContainer.textContent = tempValue + "°C";
    //     //append to weatherContainer
    //     weatherContainer.appendChild(tempContainer)

    //     //find wind speed 
    //     let windValue = daily[i].wind_speed;
    //     //create p element for wind
    //     let windContainer = document.createElement("p");
    //     //set textContent to wind
    //     windContainer.textContent = windValue + "MPH";
    //     //append to weather Container
    //     weatherContainer.appendChild(windContainer);

    //     //find humidity 
    //     let humValue = daily[i].humidity;
    //     let humContainer = document.createElement("p");
    //     humContainer.textContent = humValue + "%";
    //     weatherContainer.appendChild(humContainer);
    // }
    

    
}

document.querySelector("#search").addEventListener("click", searchWeather)
