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

}



function getLocation() {
    "use strict";
    $.ajax({
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDFzfWlc0R6k2lvaGDptHvAbvR0yqvGX94",
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
    $("#cf-switch").on("click", switchUnits);
});
