from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.mail_handler import send_budget_email, send_contact_email
from api.csv import get_csv_data
import asyncio
import traceback
import os
import re

api = Blueprint('api', __name__)
CORS(api)

EMAIL_PATTERN = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

def is_valid_email(email):
    return isinstance(email, str) and bool(EMAIL_PATTERN.fullmatch(email))

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({ "message": "Hello from backend" }), 200

@api.route('/csv', methods=['GET'])
def get_csv():
    try:
        # Ejecutar la función asincrónica desde un contexto síncrono
        data = asyncio.run(get_csv_data())
        return jsonify(data), 200
    except Exception as e:
        print("Error en /csv:", e)
        tb = traceback.format_exc()
        # En desarrollo, devolver el detalle del error para debugging
        if os.getenv('FLASK_DEBUG', '0') == '1' or os.getenv('ENV') == 'development':
            return jsonify({ "error": "Ocurrió un error interno.", "detail": str(e), "trace": tb}), 500
        return jsonify({ "error": "Ocurrió un error interno." }), 500

@api.route('/send-budget-request', methods=['POST'])
def send_budget():
    form_data = request.form
    files = request.files
    if not is_valid_email(form_data.get('email')):
        return jsonify({ "message": "El email es obligatorio y debe tener un formato válido." }), 400
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
        if not isinstance(data, dict) or not is_valid_email(data.get('email')):
            return jsonify({ "message": "El email es obligatorio y debe tener un formato válido." }), 400
        success = send_contact_email(data)
        if success:
            return jsonify({ "message": "Mensaje enviado con éxito" }), 200
        else:
            return jsonify({ "message": "Error al enviar el mensaje" }), 500
    except Exception as e:
        print("Error en /contact:", e)
        return jsonify({ "error": "Ocurrió un error interno." }), 500
