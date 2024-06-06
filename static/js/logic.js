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
  
  fetch('Crime_Incidents_in_2023.geojson')
.then(response => response.json())
.then(function(data)
{
    console.log(data);

    // function to create a heat map plot
    function geojsonToHeatmapPoints(geojsonData) {
        return geojsonData.features.map(function(feature) {
            var coords = feature.geometry.coordinates;
            return [coords[1], coords[0]]; 
        });
    }

    let heatmapPoints = geojsonToHeatmapPoints(data);

    let heat = L.heatLayer(heatmapPoints, {
        radius: 10, 
        blur: 15, 
        maxZoom: 17,
         gradient: {0.0: '#0d0887', 0.25: '#5e02a8', 0.5: '#9d02b8', 0.75: '#cd376a', 1.0: '#fde725'}
    }).addTo(myMap);

});


document.addEventListener('DOMContentLoaded', (event) => {
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


    });

    maxSlider.on('input', function() {
        let maxVal = parseInt(this.value);
        let minVal = parseInt(minSlider.node().value);
        if (maxVal < minVal) {
            minSlider.node().value = maxVal;
            minValue.text(maxVal);
        }
        maxValue.text(maxVal);
      
    
    });

});

    