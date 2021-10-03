var cityNameInput = document.querySelector("#city-name");
var citySearchTerm = document.querySelector("#weather-search-term");
var weatherContainer = document.querySelector("#weather-container");
var tempCurrentDisplay = document.querySelector("#temp-current");
var windCurrentDisplay = document.querySelector("#wind-current");
var humCurrentDisplay = document.querySelector("#hum-current");
var uviCurrentDisplay = document.querySelector("#uv-current");
var historyCon = document.querySelector("#history-btn");
var foreCastContainer = document.querySelector("#forecast-container");
var citiesHistory = JSON.parse(localStorage.getItem("citiesStored") || "[]");
var resetBtn = document.querySelector("#reset-storage");
var iconPlace = document.querySelector("#iconPlace");


let displayStorage = JSON.parse(localStorage.getItem("citiesStored"));
if (displayStorage) {
    for (var i = 0; i < displayStorage.length; i++) {
    let storageBtn = document.createElement("button");
    storageBtn.textContent = displayStorage[i];
    historyCon.appendChild(storageBtn);
}
};

let storeHistory = function (searchTerm) {
    let historyBtn = document.createElement("button")
    historyBtn.textContent = searchTerm
    //append btn to history container
    historyCon.appendChild(historyBtn)
    citiesHistory.push(searchTerm);
    localStorage.setItem("citiesStored", JSON.stringify(citiesHistory));
}
    

function searchWeather (event, researchTerm) { 
    event.preventDefault();
    //get value from input element
    let cityName = researchTerm || cityNameInput.value.trim();

    if (cityName) {
        //format the openweather geo api url
        let apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
                             })
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

    //get Icon 
    let iconCu = daily[0].weather[0].icon
    console.log(iconCu)

    //display current city name 
    citySearchTerm.textContent = searchTerm + " " + formattedTime;
    iconPlace.innerHTML = "<img class='figure-img img-fluid' src=" + "'https://openweathermap.org/img/wn/" + iconCu + "@2x.png'" + "/>";
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
    if (uviValue <= 2) {
        uviCurrentDisplay.setAttribute("class", "bg-success p-1 px-3 rounded-3")
    } else if (uviValue <= 5) {
        uviCurrentDisplay.setAttribute("class", "bg-warning p-1 px-3 rounded-3")
    } else if (uviValue <= 7) {
        uviCurrentDisplay.setAttribute("class", "bg-orange p-1 px-3 rounded-3")
    } else if (uviValue <= 10) {
        uviCurrentDisplay.setAttribute("class", "bg-danger p-1 px-3 rounded-3")
    }

 // Cards for forecasts
    console.log(foreCastContainer)
    foreCastContainer.innerHTML = "";
    for (var i = 1; i < daily.length - 2; i++) {
        //convert time 
        let cardTimeStamp = daily[i].dt;
        let cardDate = new Date(cardTimeStamp * 1000);
        var cardDay = cardDate.getDate();
        var cardMonth = cardDate.getMonth()+1;
        var cardYear = cardDate.getFullYear();
        let cardFormattedTime = cardDay + "/" + cardMonth + '/' + cardYear;
        
        //create carddiv
        const cardDiv = document.createElement("div")
        //assing class attribute card
        cardDiv.setAttribute("class", "card d-md-inline-block mx-1 my-2 p-2 drk-blue text-center text-md-start")

        //create p element for date 
        let dateContainer = document.createElement("p");
        //set textContent to date
        dateContainer.textContent = cardFormattedTime
        //append to cardDiv
        cardDiv.appendChild(dateContainer);

        
        //get Icon 
        let cardIcon = daily[i].weather[0].icon
        //create p element for icon
        let cardIconCon = document.createElement("p");
        //set innerHtml to icon
        cardIconCon.innerHTML = "<img class='figure-img img-fluid' src=" + "'https://openweathermap.org/img/wn/" + cardIcon + "@2x.png'" + "/>";
        //append to cardDiv
        cardDiv.appendChild(cardIconCon);
        
        //find temp 
        let tempValue = daily[i].temp.day;
        //create p element for temperature
        let tempContainer = document.createElement("p");
        //set textContent to temp
        tempContainer.textContent = "Temp: " + tempValue + "°C";
         //append to cardDiv
         cardDiv.appendChild(tempContainer);

        //find wind speed 
        let windValue = daily[i].wind_speed;
        //create p element for wind
        let windContainer = document.createElement("p");
        //set textContent to wind
        windContainer.textContent = "Wind: " + windValue + "MPH";
        //append to cardDiv
        cardDiv.appendChild(windContainer);

        //find humidity 
        let humValue = daily[i].humidity;
        let humContainer = document.createElement("p");
        humContainer.textContent = "Humidity: " + humValue + "%";
        cardDiv.appendChild(humContainer);
        
        foreCastContainer.appendChild(cardDiv);

    }
    


}
let resetStorage = function () {
    localStorage.clear("citiesStored")
    historyCon.innerHTML = "";
}


let show = function (event) {
// get target element from event
  var targetEl = event.target 
  console.log(targetEl)
  let researchTerm = targetEl.textContent;
  searchWeather (event, researchTerm)
}
resetBtn.addEventListener("click", resetStorage)
historyCon.addEventListener("click", show)
document.querySelector("#search").addEventListener("click", searchWeather)
