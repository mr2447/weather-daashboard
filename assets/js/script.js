var cityNameInput = document.querySelector("#city-name");
var citySearchTerm = document.querySelector("#weather-search-term");
var weatherContainer = document.querySelector("#weather-container");
var tempCurrentDisplay = document.querySelector("#temp-current");
var windCurrentDisplay = document.querySelector("#wind-current");
var humCurrentDisplay = document.querySelector("#hum-current");
var uviCurrentDisplay = document.querySelector("#uv-current");
var historyCon = document.querySelector("#history-btn");
var foreCastContainer = document.querySelector("#forecast-container")


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
                                 displayWeather(cityName, data2.daily)
                                 storeHistory(cityName)
                             });
                         } else {
                             alert('Error: City Not Found')
                         };
                     })
                })
            } else {
                alert('Error: Location Not Found')
            }
        })
        //clear old content
        cityNameInput.value="";
    } else {
        alert("Please enter a city name");
    }
}

let displayWeather = function (searchTerm, daily) {

    //convert time 
    let timestamp = daily[0].dt;
    let date = new Date(timestamp * 1000);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    let formattedTime = day + "/" + month + '/' + year;


    //display current city name 
    citySearchTerm.textContent = searchTerm + " " + formattedTime;

    //display current temperature 
    console.log(tempCurrentDisplay);
    //find temp value
    let tempValueCu = daily[0].temp.day;
    console.log(tempValueCu);
    //input value 
    tempCurrentDisplay.textContent = tempValueCu + "°C";

    //display current Wind
    console.log(windCurrentDisplay)
    //find wind value
    let windValueCu = daily[0].wind_speed;
    windCurrentDisplay.textContent = windValueCu + "MPH";

    //display hum
    console.log(humCurrentDisplay)
    let humValueCu = daily[0].humidity;
    humCurrentDisplay.textContent = humValueCu + "%";

    //display uvi
    console.log(uviCurrentDisplay);
    let uviValue = daily[0].uvi;
    uviCurrentDisplay.textContent = uviValue;

    // console.log(foreCastContainer)
    // for (var i = 1; i < daily.length; i++) {
    //     //create carddiv
    //     const cardDiv = document.createElement("div")
    //     //assing class attribute card
    //     cardDiv.setAttribute("class", "card")
        
    //     //find temp 
    //     let tempValue = daily[i].temp.day;
    //     //create p element for temperature
    //     let tempContainer = document.createElement("p");
    //     //set textContent to temp
    //     tempContainer.textContent = "Temp: " + tempValue + "°C";
    //      //append to cardDiv
    //      cardDiv.appendChild(tempContainer);

    //     //find wind speed 
    //     let windValue = daily[i].wind_speed;
    //     //create p element for wind
    //     let windContainer = document.createElement("p");
    //     //set textContent to wind
    //     windContainer.textContent = "Wind" + windValue + "MPH";
    //     //append to cardDiv
    //     cardDiv.appendChild(windContainer);

    //     //find humidity 
    //     let humValue = daily[i].humidity;
    //     let humContainer = document.createElement("p");
    //     humContainer.textContent = "Humidity" + humValue + "%";
    //     cardDiv.appendChild(humContainer);

       
    //     foreCastContainer.appendChild(cardDiv);
    // }
    


}

let storeHistory = function (searchTerm) {
    console.log(history)
    let historyBtn = document.createElement("button")
    console.log(historyBtn)
    historyBtn.textContent = searchTerm
    //append btn to history container
    historyCon.appendChild(historyBtn)
}

let test = function () {
    console.log("button working")
}

historyCon.addEventListener("click", test)
document.querySelector("#search").addEventListener("click", searchWeather)
