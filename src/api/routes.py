from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.mail_handler import send_budget_email, send_contact_email

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({ "message": "Hello from backend" }), 200

@api.route('/send-budget-request', methods=['POST'])
def send_budget():
    form_data = request.form
    files = request.files
    try:
        success = send_budget_email(form_data, files)
        if success:
            return jsonify({ "message": "Presupuesto enviado con éxito" }), 200
        else:
            return jsonify({ "message": "Error al enviar el presupuesto" }), 500
    except Exception as e:
        print("Error en /send-budget-request:", e)
        return jsonify({ "error": "Ocurrió un error interno." }), 500

@api.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        success = send_contact_email(data)
        if success:
            return jsonify({ "message": "Mensaje enviado con éxito" }), 200
        else:
            return jsonify({ "message": "Error al enviar el mensaje" }), 500
    except Exception as e:
        print("Error en /contact:", e)
        return jsonify({ "error": "Ocurrió un error interno." }), 500
