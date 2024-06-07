// fetch data
fetch('weather_data.json')
.then(response => response.json())
.then(function(weatherData){

fetch('Crime_Incidents_in_2023.geojson')
.then(response => response.json())
.then(function(crimeData){

    let features = crimeData.features

    let regexMorning = /^(\d{4}-\d{2}-\d{2}T)?(0[6-9]|1[0-1]):[0-5]\d:[0-5]\dZ?$/;
    let regexAfternoon = /^(\d{4}-\d{2}-\d{2}T)?(1[2-7]):[0-5]\d:[0-5]\dZ?$/;
    let regexEvening = /^(\d{4}-\d{2}-\d{2}T)?(1[8-9]|2[0-1]):[0-5]\d:[0-5]\dZ?$/;
    let regexNight = /^(\d{4}-\d{2}-\d{2}T)?(2[2-3]|00|01|02|03|04|05):[0-5]\d:[0-5]\dZ?$/;
    

    let morningCrimes = features.filter(crime => regexMorning.test(crime.properties.START_DATE));
    let afternoonCrimes = features.filter(crime => regexAfternoon.test(crime.properties.START_DATE));
    let eveningCrimes = features.filter(crime => regexEvening.test(crime.properties.START_DATE));
    let nightCrimes = features.filter(crime => regexNight.test(crime.properties.START_DATE));
    var crimesList = [morningCrimes, afternoonCrimes, eveningCrimes, nightCrimes]

    var weatherDict = {};

    // create a dictionary for weather temperature by date
    weatherData.forEach(entry =>{
    let date = entry.date;
        let temperature = entry.temperature;
        weatherDict[date] = temperature
    });


    // Define bounds for map
    let washingtonDCBounds = L.latLngBounds(
        L.latLng(38.71, -76.83), 
        L.latLng(39.11, -77.23) 
    );

    // Creating the map object
    let myMap = L.map("map", {
        maxBounds: washingtonDCBounds,
        maxBoundsViscosity: 5.0,
        center: [38.91,-77.03],
        zoom: 11.5
    });


      // Adding the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);



       var heat = null
    // function to convert crime data to a heat map
    function createMap(tempData) {
        
        heat = L.heatLayer(tempData, {
            radius: 12, 
            blur: 15, 
            maxZoom: 17,
            gradient: {0.0: '#0d0887', 0.25: '#5e02a8', 0.5: '#9d02b8', 0.75: '#cd376a', 1.0: '#fde725'}
        }).addTo(myMap); 

    };
    
    // function to find all crimes in that temperature range
    function findCrimes(numRange) {

        let tempData = [];
        let loopCount = 0;

        // loop through each time region of crimes
        for (let i = 0; i < crimesList.length; i++){
                crimeZone = crimesList[i]
                loopCount += 1;

            // loop through each crime in that region
            for (let j = 0; j< crimeZone.length; j++){
                let feature = crimeZone[j];
                let startDate = feature.properties.START_DATE

                // Make sure there is a start Date
                if (startDate){
                    let datePart = startDate.split('T')[0];
                    let year = datePart.split('-')[0];

                    // Make sure crime started in 2023, check the temperature for when the crime occured
                    // if crime temp is in selected temperature range for the correct time range push it to tempData
                    if(year >= 2023 && year < 2024){
                        let lat = feature.geometry.coordinates[1];
                        let lon = feature.geometry.coordinates[0];

                        if (loopCount == 1){
                            let morningTemp = weatherDict[datePart].morning;

                                if (morningTemp >= numRange[0] && morningTemp <= numRange[1])
                                    {tempData.push([lat,lon])}
                            }
                        else if (loopCount == 2){
                            let afternoonTemp = weatherDict[datePart].afternoon;
                                if (afternoonTemp >= numRange[0] && afternoonTemp <= numRange[1])
                                    {tempData.push([lat,lon])}
                            }      
                        else if (loopCount == 3){
                            let eveningTemp = weatherDict[datePart].evening;
                                if (eveningTemp >= numRange[0] && eveningTemp <= numRange[1])
                                    {tempData.push([lat,lon])}
                            }     
                        else if  (loopCount == 4){
                            let nightTemp = weatherDict[datePart].night;
                                if (nightTemp >= numRange[0] && nightTemp <= numRange[1])
                                    {tempData.push([lat,lon])}
                            }       
                        };
                    };
                };

            };
            
        createMap(tempData)

        }; 


        
        // initialize map at loading screen 
        findCrimes([15,100]);

        // select the slider parts
        let minSlider = d3.select('#minSlider');
        let minValue = d3.select('#minValue');
        let maxSlider = d3.select('#maxSlider');
        let maxValue = d3.select('#maxValue');
        

        // Update the slider value display and prevent min being larger than max
        // call function when slider is changed
        minSlider.on('input', function() {
            let minVal = parseInt(this.value);
            let maxVal = parseInt(maxSlider.node().value);
            if (minVal > maxVal) {
                maxSlider.node().value = minVal;
                maxValue.text(minVal);
            }
            minValue.text(minVal);
            let numRange = [minVal, maxVal];
            heat.remove()
            findCrimes(numRange);
        
        });

        maxSlider.on('input', function() {
            let maxVal = parseInt(this.value);
            let minVal = parseInt(minSlider.node().value);
            if (maxVal < minVal) {
                minSlider.node().value = maxVal;
                minValue.text(maxVal);
            }
            maxValue.text(maxVal);
            let numRange = [minVal, maxVal];
            heat.remove()
            findCrimes(numRange);
        
        
        });

});

});


