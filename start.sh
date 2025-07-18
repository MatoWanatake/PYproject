#!/bin/sh

echo "✅ start.sh is running"

echo "Running flask db upgrade..."
flask db upgrade || { echo "❌ DB upgrade failed"; exit 1; }

echo "Running flask seed all..."
flask seed all || { echo "❌ DB seed failed"; exit 1; }

echo "Starting gunicorn..."
gunicorn --bind 0.0.0.0:5000 app:app
