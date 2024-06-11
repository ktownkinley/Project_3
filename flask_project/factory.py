import os

from flask import Flask, render_template
from json import JSONEncoder
from flask_cors import CORS
##from flask_bcrypt import Bcrypt
##from flask_jwt_extended import JWTManager

from bson import json_util, ObjectId
from datetime import datetime, timedelta

from api import crime_api_v1, weather_api_v1

class MongoJsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, ObjectId):
            return str(obj)
        return json_util.default(obj, json_util.CANONICAL_JSON_OPTIONS)


def create_app():

    APP_DIR = os.path.abspath(os.path.dirname(__file__))

    app = Flask(__name__)
    CORS(app)
    app.json_encoder = MongoJsonEncoder
    app.register_blueprint(crime_api_v1)
    app.register_blueprint(weather_api_v1)

    @app.route("/")
    def welcome():
        """List all available api routes."""
        return (
            "Available Routes:<br/>"
            "/api/v1/weather/all<br/>"
            "/api/v1/crimes/all<br/>"
            "/api/v1/crimes/filtered<br/>"
        )
        
    return app