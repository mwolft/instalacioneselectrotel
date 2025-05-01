from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.mail_handler import send_budget_email, send_contact_email

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = { "message": "Hello from backend" }
    return jsonify(response_body), 200

@api.route('/send-budget-request', methods=['POST'])
def send_budget():
    form_data = request.form
    files = request.files
    success = send_budget_email(form_data, files)

    if success:
        return jsonify({ "message": "Presupuesto enviado con éxito" }), 200
    else:
        return jsonify({ "message": "Error al enviar el presupuesto" }), 500

@api.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    success = send_contact_email(data)

    if success:
        return jsonify({ "message": "Mensaje enviado con éxito" }), 200
    else:
        return jsonify({ "message": "Error al enviar el mensaje" }), 500
