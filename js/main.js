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

function changeImages(icon) {
    "use strict";

    var owmIcon = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d", "01n", "02n", "03n", "04n", "09n", "10n", "11n", "13n", "50n"],
        meteoconCode = ["B", "H", "N", "Y", "R", "Q", "O", "W", "J", "C", "I", "N", "Y", "R", "Z", "W", "K"],
        wColors = ["#8FC8DB", "#9DC0CC", "#B5BBBD", "#A1A1A1", "#6A93A1", "#7CB2C4", "#ACB3B5", "#D1D1D1", "#9FB0B5", "#757575", "#6E7273", "#484B4D", "#272829", "#323E42", "#4B585C", "#5E6263", "#7A7E80", "#232324"],
        n = owmIcon.indexOf(icon);

    $(".weather-icon").attr("data-icon", meteoconCode[n]);
    $("body").css("background-color", wColors[n]);
    $(".switch-round+ label").css("background-color", wColors[n]);

}


function windDir(deg) {
    "use strict";

    var key,
        dir = {
            "N": [348.76, 11.25],
            "NNE": [11.26, 33.75],
            "NE": [33.76, 56.25],
            "ENE": [56.26, 78.75],
            "E": [78.76, 101.25],
            "ESE": [101.26, 123.75],
            "SE": [123.76, 146.25],
            "SSE": [146.26, 168.75],
            "S": [168.76, 191.25],
            "SSW": [191.26, 213.75],
            "SW": [213.76, 236.25],
            "WSW": [236.26, 258.75],
            "W": [258.76, 281.25],
            "WNW": [281.26, 303.75],
            "NW": [303.76, 326.25],
            "NNW": [326.26, 348.75]
        };

    for (key in dir) {
        if (dir.hasOwnProperty(key)) {
            if (deg >= dir[key][0] && deg <= dir[key][1]) {
                return key;
            }
        }
    }

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

            $(".city-name").text(response.city.name + ", " + response.city.country);

            $(".weather-desc").text(response.list[0].weather[0].main);

            $(".humidity").text(response.list[0].main.humidity);
            $(".pressure").text(response.list[0].main.pressure);
            $(".wind-dir").text(windDir(response.list[0].wind.deg));
            $(".wind-speed").text(response.list[0].wind.speed);
            $(".cloudiness").text(response.list[0].clouds.all);

            changeImages(response.list[0].weather[0].icon);
            console.log(response.list[0].weather[0].icon);
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
    $("#btn-refresh").on("click", getLocation);

});