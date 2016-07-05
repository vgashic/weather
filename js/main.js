function switchUnits() {
    var checked = $("#cf-switch").is(":checked");

    // current values
    var tempVal = $(".temp-val").text();
    var tempUnit = $(".temp-units").text()[1];

    if (checked) {
        $(".temp-units").text("°C");
        $(".temp-val").text(convertTemperature(tempVal, "C"));
    } else {
        $(".temp-units").text("°F");
        $(".temp-val").text(convertTemperature(tempVal, "F"));
    }
}

function convertTemperature(val, convertTo) {
    if (convertTo === "C") {
        return Math.round((val - 32.0) / 1.8);
    }

    if (convertTo === "F") {
        return Math.round(val * 1.8 + 32);
    }

    return "n/a";
}

function getLocation() {
    $.ajax({
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDFzfWlc0R6k2lvaGDptHvAbvR0yqvGX94",
        type: "POST"
    })
}


$(document).ready(function() {
    $("#cf-switch").on("click", switchUnits);
})
