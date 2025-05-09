"""empty message

Revision ID: b1246d816c39
Revises: 
Create Date: 2025-04-20 03:11:28.072605

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b1246d816c39'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('professional',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_name', sa.String(length=150), nullable=True),
    sa.Column('address', sa.String(length=255), nullable=True),
    sa.Column('base_lat', sa.Float(), nullable=True),
    sa.Column('base_lng', sa.Float(), nullable=True),
    sa.Column('travel_rate', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('quote',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Enum('pendiente', 'aceptado', 'rechazado', name='quote_status'), nullable=False),
    sa.Column('distance_km', sa.Float(), nullable=False),
    sa.Column('travel_cost', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('subtotal', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('iva', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('total', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('service',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('base_price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('iva_rate', sa.Numeric(precision=4, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('invoice',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('quote_id', sa.Integer(), nullable=False),
    sa.Column('issued_at', sa.DateTime(), nullable=False),
    sa.Column('paid', sa.Boolean(), nullable=False),
    sa.Column('payment_method', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['quote_id'], ['quote.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('quote_item',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('quote_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('unit_price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('line_total', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['quote_id'], ['quote.id'], ),
    sa.ForeignKeyConstraint(['service_id'], ['service.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('quote_item')
    op.drop_table('invoice')
    op.drop_table('service')
    op.drop_table('quote')
    op.drop_table('professional')
    op.drop_table('user')
    # ### end Alembic commands ###
