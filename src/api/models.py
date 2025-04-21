# Dependencias necesarias:
# pip install flask-sqlalchemy flask-migrate
# (Opcional para geolocalización: pip install geopy)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, Float, Numeric, ForeignKey, DateTime, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

# Instancia de la base de datos
# Crear la instancia sin indentación extra
# Configurar con app.config['SQLALCHEMY_DATABASE_URI'] antes de init

db = SQLAlchemy()

# --------------------------------
# Modelo de Usuario y Roles
# --------------------------------
class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)

    # Relaciones
    professional_profile: Mapped['Professional'] = relationship('Professional', back_populates='user', uselist=False)
    quotes: Mapped[list['Quote']] = relationship('Quote', back_populates='client')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active
        }

# --------------------------------
# Perfil del Profesional
# --------------------------------
class Professional(db.Model):
    __tablename__ = 'professional'
    id: Mapped[int] = mapped_column(ForeignKey('user.id'), primary_key=True)
    business_name: Mapped[str] = mapped_column(String(150), nullable=True)
    address: Mapped[str] = mapped_column(String(255), nullable=True)
    base_lat: Mapped[float] = mapped_column(Float, nullable=True)
    base_lng: Mapped[float] = mapped_column(Float, nullable=True)
    travel_rate: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), default=0)

    # Relaciones
    user: Mapped['User'] = relationship('User', back_populates='professional_profile')
    services: Mapped[list['Service']] = relationship('Service', back_populates='professional', cascade='all, delete')
    quotes: Mapped[list['Quote']] = relationship('Quote', back_populates='professional')

# --------------------------------
# Catálogo de Servicios
# --------------------------------
class Service(db.Model):
    __tablename__ = 'service'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    professional_id: Mapped[int] = mapped_column(ForeignKey('professional.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    base_price: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), nullable=False)
    iva_rate: Mapped[Numeric] = mapped_column(Numeric(precision=4, scale=2), default=0.21)

    # Relaciones
    professional: Mapped['Professional'] = relationship('Professional', back_populates='services')
    quote_items: Mapped[list['QuoteItem']] = relationship('QuoteItem', back_populates='service')

# --------------------------------
# Presupuestos (Quotes)
# --------------------------------
class Quote(db.Model):
    __tablename__ = 'quote'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    client_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    professional_id: Mapped[int] = mapped_column(ForeignKey('professional.id'), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(Enum('pendiente', 'aceptado', 'rechazado', name='quote_status'), default='pendiente')
    distance_km: Mapped[float] = mapped_column(Float, default=0)
    travel_cost: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), default=0)
    subtotal: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), default=0)
    iva: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), default=0)
    total: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), default=0)

    # Relaciones
    client: Mapped['User'] = relationship('User', back_populates='quotes')
    professional: Mapped['Professional'] = relationship('Professional', back_populates='quotes')
    items: Mapped[list['QuoteItem']] = relationship('QuoteItem', back_populates='quote', cascade='all, delete')

# --------------------------------
# Líneas de Servicio en el Presupuesto
# --------------------------------
class QuoteItem(db.Model):
    __tablename__ = 'quote_item'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    quote_id: Mapped[int] = mapped_column(ForeignKey('quote.id'), nullable=False)
    service_id: Mapped[int] = mapped_column(ForeignKey('service.id'), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    unit_price: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), nullable=False)
    line_total: Mapped[Numeric] = mapped_column(Numeric(precision=10, scale=2), nullable=False)

    # Relaciones
    quote: Mapped['Quote'] = relationship('Quote', back_populates='items')
    service: Mapped['Service'] = relationship('Service', back_populates='quote_items')

# --------------------------------
# Facturas (Invoices)
# --------------------------------
class Invoice(db.Model):
    __tablename__ = 'invoice'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    quote_id: Mapped[int] = mapped_column(ForeignKey('quote.id'), nullable=False)
    issued_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    paid: Mapped[bool] = mapped_column(Boolean(), default=False)
    payment_method: Mapped[str] = mapped_column(String(50), nullable=True)

    # Relaciones
    quote: Mapped['Quote'] = relationship('Quote')
