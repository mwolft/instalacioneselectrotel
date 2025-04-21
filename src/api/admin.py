import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Professional, Service, Quote, QuoteItem, Invoice

def setup_admin(app):
    # Configuración de Flask-Admin
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'superhero'
    admin = Admin(app, name='Electrotel', template_mode='bootstrap3')
    admin.add_view(ModelView(User, db.session, category="Usuarios"))
    admin.add_view(ModelView(Professional, db.session, category="Usuarios"))
    admin.add_view(ModelView(Service, db.session, category="Catálogo"))
    admin.add_view(ModelView(Quote, db.session, category="Transacciones"))
    admin.add_view(ModelView(QuoteItem, db.session, category="Transacciones"))
    admin.add_view(ModelView(Invoice, db.session, category="Facturación"))
