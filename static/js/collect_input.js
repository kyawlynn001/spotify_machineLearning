// Getting a reference to the button on the page
var chilinButton = d3.select("#chilin-click");
var excitedButton = d3.select("#excited-click");
var danceButton = d3.select("#dance-click");
var noDanceButton = d3.select("#no-dance-click");
var musicianButton = d3.select("#musician-click");
var singerButton = d3.select("#singer-click");

// Create a list to store the list of feature scores
var scoreList = [];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

chilinButton.on("click", function() {
    var loudnessScore = round(getRandomArbitrary(-40, -14), 2);
    var energyScore = round(getRandomArbitrary(0, 0.3), 2);

    scoreList.push(loudnessScore, energyScore);
    console.log(scoreList);
    sessionStorage.setItem("scoreList1", JSON.stringify(scoreList));
});

excitedButton.on("click", function() {
    var loudnessScore = round(getRandomArbitrary(-10, -1), 2);
    var energyScore = round(getRandomArbitrary(0.5, 1), 2);

    scoreList.push(loudnessScore, energyScore)
    console.log(scoreList)
    sessionStorage.setItem("scoreList1", JSON.stringify(scoreList));
});

danceButton.on("click", function() {
    var danceabilityScore = round(getRandomArbitrary(0.4, 1), 2);
    var scoreList = JSON.parse(sessionStorage.getItem("scoreList1"))

    scoreList.push(danceabilityScore)
    console.log(scoreList)
    sessionStorage.setItem("scoreList2", JSON.stringify(scoreList));
});

noDanceButton.on("click", function() {
    var danceabilityScore = round(getRandomArbitrary(0, 0.35), 2);
    var scoreList = JSON.parse(sessionStorage.getItem("scoreList1"))

    scoreList.push(danceabilityScore)
    console.log(scoreList)
    sessionStorage.setItem("scoreList2", JSON.stringify(scoreList));
});

musicianButton.on("click", function() {
    var instrumentalScore = round(getRandomArbitrary(0.7, 1), 2);
    var scoreList = JSON.parse(sessionStorage.getItem("scoreList2"))

    scoreList.push(instrumentalScore)
    console.log(scoreList)
    sessionStorage.setItem("scoreList3", JSON.stringify(scoreList));

    var payload = {
        "scoreList": scoreList
    };

    $.post("/result", JSON.stringify(payload), function(response) {
        console.log("POST Successful");
        console.log(response)
        
    })
    .done(function() {
        console.log("Done function executed")
        $(location).attr('href','/result');
    })

});

singerButton.on("click", function() {
    var instrumentalScore = round(getRandomArbitrary(0, 0.05), 2);
    var scoreList = JSON.parse(sessionStorage.getItem("scoreList2"))

    scoreList.push(instrumentalScore)
    console.log(scoreList)
    sessionStorage.setItem("scoreList3", JSON.stringify(scoreList));

    var payload = {
        "scoreList": scoreList
    };

    $.post("/result", JSON.stringify(payload), function(response) {
        console.log("POST Successful");
        console.log(response)
        
    })
    .done(function() {
        console.log("Done function executed")
        $(location).attr('href','/result');
    })

});







