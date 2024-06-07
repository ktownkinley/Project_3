// fetch data
fetch('weather_data.json')
.then(response => response.json())
.then(function(weatherData){

fetch('Crime_Incidents_in_2023.geojson')
.then(response => response.json())
.then(function(crimeData){

let features = crimeData.features



let morningCrimes = features.slice(0,1000);
let afternoonCrimes = features.slice(1000,2000)
let eveningCrimes = features.slice(2000,3000);
let nightCrimes = features.slice(3000,4000)
let crimesList = [morningCrimes, afternoonCrimes, eveningCrimes, nightCrimes]


let tempData = [];
let loopCount = 0;
let numRange = [30,45]

let weatherDict = {};
weatherData.forEach(entry =>{

   let date = entry.date;
    temperature = entry.temperature
    weatherDict[date] = temperature

})



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


});

});