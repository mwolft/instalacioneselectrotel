import os
import smtplib
from email.message import EmailMessage

EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASS = os.getenv('EMAIL_PASS')
EMAIL_TO = os.getenv('EMAIL_TO') or EMAIL_USER  

def send_budget_email(data):
    msg = EmailMessage()
    msg['Subject'] = 'Nueva solicitud de presupuesto'
    msg['From'] = EMAIL_USER
    msg['To'] = EMAIL_TO
    msg.set_content(f"""
    Nombre: {data.get('nombre')}
    Email: {data.get('email')}
    Teléfono: {data.get('telefono')}
    Código Postal: {data.get('codigoPostal')}
    Mensaje: {data.get('mensaje')}
    """)
    send_email(msg)

def send_contact_email(data):
    msg = EmailMessage()
    msg['Subject'] = 'Nuevo mensaje de contacto'
    msg['From'] = EMAIL_USER
    msg['To'] = EMAIL_TO
    msg.set_content(f"""
    Nombre: {data.get('nombre')}
    Email: {data.get('email')}
    Teléfono: {data.get('telefono')}
    Mensaje: {data.get('mensaje')}
    """)
    send_email(msg)

def send_email(msg):
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_USER, EMAIL_PASS)
        smtp.send_message(msg)
