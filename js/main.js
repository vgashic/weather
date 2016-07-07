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
	var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/weather?"
	console.log(location.location.lat);
	var lat = "lat=" + location.location.lat + "&";
	var lon = "lon=" + location.location.lng + "&";
	var appId = "APPID=54b4f28c77ecfb3acd3e3bf77ed99b61";
	var url = weatherUrl + lat + lon + appId;

	console.log(url);
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
	$("#cf-switch").on("click", switchUnits);
});