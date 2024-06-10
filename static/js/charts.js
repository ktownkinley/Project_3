
function buildBarChart(chartData) {
  
    let groupedCrimes = chartData.reduce((acc, str) => {
        if (!acc[str]) {
          acc[str] = 0;
        }
        acc[str]++;
        return acc;
      }, {});

    let labels = Object.keys(groupedCrimes);
    let counts = Object.values(groupedCrimes);

    let index = labels.indexOf("ASSAULT W/DANGEROUS WEAPON");
        if (index !== -1) {
        labels[index] = "ASSAULT";
        }

    var trace1 = {
        x: labels,
        y: counts,
        name: 'Crime Types',
        type: 'bar'
        
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'Amount of Crimes by Type',
        xaxis: {
            automargin: true,
        },
        yaxis: {
          title: 'Number of Crimes'
        }
      };
    
    Plotly.newPlot('myDiv', data, layout);
}