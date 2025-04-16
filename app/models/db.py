import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///dev.db")

IS_SQLITE = DATABASE_URL.startswith("sqlite")

# Only apply schema if NOT using SQLite
if not IS_SQLITE and SCHEMA:
    metadata = MetaData(schema=SCHEMA)
else:
    metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
