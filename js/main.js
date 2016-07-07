/*jslint browser: true */
/*global $, jQuery, alert, console */


function convertTemperature(val, convertTo) {
    "use strict";
    if (convertTo === "C") {
        return Math.round((val - 32.0) / 1.8);
    }

    if (convertTo === "F") {
        return Math.round(val * 1.8 + 32);
    }

    return "n/a";
}


function switchUnits() {
    "use strict";
    var checked = $("#cf-switch").is(":checked"),

        // current values
        tempVal = $(".temp-val").text(),
        tempUnit = $(".temp-units").text()[1];

    if (checked) {
        $(".temp-units").text("°C");
        $(".temp-val").text(convertTemperature(tempVal, "C"));
    } else {
        $(".temp-units").text("°F");
        $(".temp-val").text(convertTemperature(tempVal, "F"));
    }
}

function changeImages() {
    "use strict";

}


function getWeatherData(location) {
    "use strict";
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/weather?",
        lat = "lat=" + location.location.lat + "&",
        lon = "lon=" + location.location.lng + "&",
        appId = "APPID=54b4f28c77ecfb3acd3e3bf77ed99b61",
        url = weatherUrl + lat + lon + appId;

    $.ajax({
        url: url,
        type: "POST",
        dataType: "jsonp",
        success: function (response) {
            console.log(response);

            $(".temp-val").text(Math.round(response.list[0].main.temp - 273.15, 0));

            $(".city-name").text(response.city.name);
        }
    });
}

//{
//	"location": {
//		"lat": 44.786567999999995,
//		"lng": 20.4489216
//	},
//	"accuracy": 11057.0
//}



function getLocation() {
    "use strict";
    $.ajax({
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBM75kiKj9tkuhWe97m1Ckqlq80bc_VduA",
        type: "POST",
        success: function (response) {
            getWeatherData(response);
        },
        error: function () {
            // todo: handle error
            alert("Can't get your location");
        }
    });
}


$(document).ready(function () {
    "use strict";
    getLocation();
    $("#cf-switch").on("click", switchUnits);
});