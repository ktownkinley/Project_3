// Creating the map object
let myMap = L.map("map", {
    center: [38.91,-77.03],
    zoom: 11
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
        maxZoom: 17
    }).addTo(myMap);

});