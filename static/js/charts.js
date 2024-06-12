
function buildBarChart(chartData) {

    let groupedCrimes = chartData.reduce((acc, str) => {
        if (!acc[str]) {
            acc[str] = 0;
        }
        acc[str]++;
        return acc;
    }, {});

//    let labels = Object.keys(groupedCrimes);
    let counts = Object.values(groupedCrimes);

    //Adjust labels for readability
//    let index = labels.indexOf("ASSAULT W/DANGEROUS WEAPON");
//    if (index !== -1) {
//        labels[index] = "Assault";
//    }
    
    const labelMapping = {
        "THEFT F/AUTO": "Car Break-In",
        "THEFT/OTHER": "Theft",
        "ROBBERY": "Armed Robbery",
        "MOTOR VEHICLE THEFT": "Auto Theft",
        "SEX ABUSE": "Sex Abuse",
        "ASSAULT W/DANGEROUS WEAPON": "Assault",
        "HOMICIDE": "Homicide",
        "BURGLARY": "Burglary"
    };
    let labels = Object.keys(groupedCrimes);
    labels = labels.map(label => labelMapping[label] || label);

    // Sort the labels and counts arrays in descending order
    labels.sort((a, b) => groupedCrimes[b] - groupedCrimes[a]);
    counts.sort((a, b) => groupedCrimes[b] - groupedCrimes[a]);

    var trace1 = {
        x: counts,
        y: labels,
        name: 'Crime Types',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(157,167,86,0.8)',
            width: 1
        },
    };

    var data = [trace1];

    var layout = {
        title: 'Amount of Crime by Type',
        xaxis: {
            title: 'Crime Count',
            tickvals: [0, 2000, 4000, 6000, 8000, 10000, 12000], 
        },
        yaxis: {
            automargin: true,
        },
        font: {
            family: 'Arial',  // Specify the font family
            size: 12,         // Specify the font size
            color: 'black'    // Specify the font color
        }
    };

    Plotly.newPlot('myDiv', data, layout);
}