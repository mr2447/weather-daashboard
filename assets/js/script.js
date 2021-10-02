// var cityNameInput = document.querySelector("#city-name");
// function searchWeather () {
    
    
//     //get value from input element
//     var cityName = cityNameInput.value.trim();

//     if (cityName) {
//         //format the openweather geo api url
//         let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +
//         cityName +
//         "&appid=ff9a02b937539db6bdc17cba9723e9a6"

//         fetch (apiUrl).then(function(response) {
//             if(response.ok) {
//                 response.json().then(function(data) {
//                     var lon = data.coord.lon
//                      var lat = data.coord.lat
//                     //     let apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?" +
//                       "lat=" + lat +
//                         "&lon=" + lon +
//                      "&appid=ff9a02b937539db6bdc17cba9723e9a6"
//                      fetch(apiUrl2)
//                 })
//             }
//         })
//         //clear old content
//         cityNameInput.valie="";
//     } else {
//         alert("Please enter a city name");
//     }
// }
// var getWeatherInfo = function(lat, lon) {
//     //format the openweather api url
//     let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" +
//     "lat=" + lat +
//     "&lon=" + lon +
//     "&appid=ff9a02b937539db6bdc17cba9723e9a6"

//     fetch(apiUrl).then(function(response) {
//         if(response.ok) {
//             response.json().then(function(data) {
//                console.log(data)
//             });
//         } else {
//             alert('Error: City Not Found')
//         }
//     })
// }
console.log("test")
function searchWeather(){
    var city = document.querySelector("#city-name").value.trim();
    console.log("city")
}

document.querySelector("#search").addEventListener("click", searchWeather)
