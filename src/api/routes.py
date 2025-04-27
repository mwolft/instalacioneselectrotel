"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.mail_handler import send_budget_email, send_contact_email

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/send-budget', methods=['POST'])
def send_budget():
    form_data = request.form
    files = request.files

    success = send_budget_email(form_data, files)

    if success:
        return jsonify({"message": "Presupuesto enviado con éxito"}), 200
    else:
        return jsonify({"message": "Error al enviar el presupuesto"}), 500


def send_budget_email(data):
    print("Simulación de envío de presupuesto:", data)

def send_contact_email(data):
    print("Simulación de envío de contacto:", data)
