# Project_3
# Hypothesis
Variations in weather temperature have a measurable impact on crime in Washington DC. Specifically, we expect to find a positive correlation between warmer weather conditions and an increase in crime.

# Overview
We scaled this project appropriately by selecting data from the year 2023, narrowing results to one city, and adjusting our analysis to include only temperature. See the "Expansion" section below to explore how these decisions might change, given more resources.

Our database engineering was handled through MongoDB, Flask, and python
API calls and analysis were articulated in Javascript files
Front-end rendering was built with HTML and CSS

Open Weather data is collected based on four segments: morning, afternoon, evening, and night. For seamless joining we created corresponding bins for the crime data. This introduces some level of estimation in the study. MORE ABOUT OUR DESIGN/PROCESS HERE/ANY KEY DECISIONS

# Sources
https://opendata.dc.gov/datasets/DCGIS::crime-incidents-in-2023/explore
https://openweathermap.org/

# Results
- Theft is the most common crime in Washington DC.
- The highest crime density interval occured between 66-76F at 21.24%, debunking the movie stereotype that crime happens more often at night.
- Less than 2% of all crime takes place after temperatures reach 90F.

# Potential Applications
Climate change forecasts may influence staffing, scheduling, and budget allocation for local first responders.
Theses findings may inspire an obscure sunscreen commercial.

# Limitations
- There is a known disparity between actual crime and reported crime. We have not designed our current analysis or adjusted our results to address this gap. 

# Expansion
- States with four seasons likely have a different crime distribution than dessert locations. Looking at national data would improve the integrity of our findings, and may reveal entirely different patterns.
- Including weather data with concise timestamps, and adding variables such as humidity and precipitation would bolster the accuracy of these tests.
- This dataset hints at a distinction between indoor vs. outdoor crime. It may be valuable to compare these findings with information on at-risk populations. For example, indoor crimes may disproportionetly impact children during the winter. 
