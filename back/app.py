import math
import json
from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('colleges.json', 'r') as file:
  json_data = file.read()
  coorddata = json.loads(json_data)

def haversine(lat1, lon1, lat2, lon2):
  R = 6371  # Radius of the Earth in kilometers

  dlat = math.radians(lat2 - lat1)
  dlon = math.radians(lon2 - lon1)

  a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1))
  b = math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)

  c = a * b

  d = 2 * math.atan2(math.sqrt(abs(c)), math.sqrt(abs(1 - c)))

  distance = R * d
  return distance


def get_sorted_universities(lon, lat):
  universities = coorddata["universities"]

  # closest = get_closest_university(lon, lat)
  # universities.remove(closest)
  def comp(university):
    university["distance"] = haversine(lon, lat, float(university["coordinates"]["longitude"]),
                                       float(university["coordinates"]["latitude"]))

    return haversine(lon, lat, float(university["coordinates"]["longitude"]),
                     float(university["coordinates"]["latitude"]))

  universities.sort(key=comp)
  # print(universities)
  return universities


@app.route('/get_sorted_universities/<lon>/<lat>', methods=['GET'])
def doGet(lon,lat):
  print("enter")
  result = []
  for university in get_sorted_universities(float(lon), float(lat)):
    result.append({
        "name": university["name"],
        "distance": university["distance"],
        "address": university["address"],
        "website_url": university["website_url"],
        "tuition": university["tuition"],
        "picture": university["picture"],
        "logo":university["logo"],
        "coordinates":university["coordinates"]
    })

  response = jsonify({"arr":result})
  print(response)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0',port=890)
