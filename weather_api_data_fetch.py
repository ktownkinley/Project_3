import requests
import json
import datetime as dt
from key import api_key

url = "https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=38.9072&lon=-77.0369&"

days = {}
start_date = dt.date(2023, 1, 1)
end_date = dt.date(2023 + 1, 1, 1)
current_date = start_date
# query = f'{url}date={current_date.strftime("%Y-%m-%d")}&appid={api_key}'
# days[current_date.strftime("%Y-%m-%d")] = requests.get(query).json()
while current_date < end_date:
    query = f'{url}date={current_date.strftime("%Y-%m-%d")}&appid={api_key}'
    days[current_date.strftime("%Y-%m-%d")] = requests.get(query).json()
    current_date += dt.timedelta(days=1)

with open('weather_data.json', 'w') as f:
    data = json.dump(days, f, indent=4)
    print('JSON data exported successfully.')

