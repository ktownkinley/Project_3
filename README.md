# Crime and Weather Conditions: An Interactive Analysis Project 

# How to Utilize the Code
- Flask
  
Within the flask_project folder in the repository, running the run.py file will launch a flask application that will serve the API routes to any browser. It can be run on localhost or hosted on any cloud server, ex. we hosted using AWS. When you have the IP of the host (local or cloud), the IP address must be updated in the logic.js file to point to the proper hosting location.
- Database
  
We used a MongoDB Atlas cluster to host the data for this project. A mongo_cred.py file with a uri={DB uri here} is required in that instance to connect to the database cluster. It can also be used with a local MongoDB Compass instance.

# Hypothesis
Variations in weather temperature have a measurable impact on crime in Washington DC. Specifically, we expect to find a positive correlation between warmer weather conditions and an increase in crime.

# Overview
We scaled this project appropriately by selecting data from the year 2023, narrowing results to one city, and adjusting our analysis to include only temperature. See the "Expansion" section below to explore how these decisions might change, given more resources.

- Our database engineering was handled through MongoDB, Flask, and python
- API calls and analysis were articulated in Javascript files
- Front-end rendering was built with HTML and CSS
- We used a new-to-us python library flask_pymongo that allowed our Flask application to connect to a MongoDB Atlas instance

Open Weather data was gathered from Washington DC for every day of 2023 and seperated based on four segments: morning, afternoon, evening, and night. For seamless joining, we created corresponding bins for the crime data based on the crime report. This study incorporates an element of estimation by examining time ranges rather than specific points, because of the constraints on the number of free API calls available to us. From the binned crime data, the date of the crime was compared to the approprate weather findings and the crime was logged depening on if its corresponding temperature falls within the user selected temperate range. Subsequently, with the given temperature range the crimes were plotted on a density map, graphed by crime type distribution, and the percentage of crime occuring was calculated.   

# Interactive Display
In the browser users can adjust the temperature range sliders on the right. The corresponding density map and bar chart for crime will dynamically respond to the new input. Users can also zoom on the map to see how specific areas are impacted. In the second row users can hover to get more specific data for each chart.
Currently, the web display is hosted at [http://13.57.33.163:5000/](http://13.57.32.167:5000/)

# Sources
https://opendata.dc.gov/datasets/DCGIS::crime-incidents-in-2023/explore

https://openweathermap.org/

https://github.com/mongodb-developer/flask-pymongo-example/tree/main/mflix

-leaflet.js stores all of our code for the heatmap rendering. (c) 2014, Vladimir Agafonkin
 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
 https://github.com/mourner/simpleheat
 
- These data sets were chosen because they are gathered, filtered, and stored for public use. It's important to note for ethical practices that the crime data has been anonymized to exclude the names of perpetrators and victims. The locations of crimes have also been randomized with a block ID's rather than exact addresses. 

# Results
- We ran a Pearson R Correlation test to see if there truly is a linear relationship between crime counts and temperature. Results show that our p-value is 0.0012, show there is a statistically significant relationship. While the r-value of 0.355, affirms a moderately positive correlation. Note that the correlation is weaker because of the strong decrease in crime during extreme tempertures. 
- Theft is the most common crime in Washington DC.
- Less than 2% of all crime takes place after temperatures reach 90°F, limiting our positive correlation hypothesis.
- Less than 2% of all crimes takes place below 32°F.
- The highest crime density for a 5 degree interval occured between 70-74F at 9.22%.
- This suggest that moderate temperatures lead to the highest amounts of crime.
- 12.62% of crime happens in the morning, 26.89% in the afternoon, 22.22% in the evening and 38.27% at night.

# Potential Applications
Climate change forecasts may influence staffing, scheduling, and budget allocation for local first responders.

# Limitations
- There is a known disparity between actual crime and reported crime. We have not designed our current analysis or adjusted our results to address this gap.
- The number of free api calls openweather allows limited the specificity of our data, as temperature was not found per crime and instead determined by time range the crime occured. 

# Expansion
- States with four seasons likely have a different crime distribution than desert locations. Looking at national data would improve the integrity of our findings, and may reveal entirely different patterns.
- Including weather data with concise timestamps, and adding variables such as humidity and precipitation would bolster the accuracy of these tests.
- This dataset hints at a distinction between indoor vs. outdoor crime. It may be valuable to compare these findings with information on at-risk populations. For example, indoor crimes may disproportionetly impact children during the winter. 
