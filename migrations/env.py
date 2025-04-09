from __future__ import with_statement
import logging
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool, text
from alembic import context

import os
from flask import current_app

# Load environment variables
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# Alembic Config object
config = context.config

# Set up logging
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

# Set SQLAlchemy URL
config.set_main_option(
    'sqlalchemy.url',
    str(current_app.extensions['migrate'].db.engine.url).replace('%', '%%')
)

# Target metadata for autogeneration
target_metadata = current_app.extensions['migrate'].db.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    def process_revision_directives(context, revision, directives):
        if getattr(config.cmd_opts, 'autogenerate', False):
            script = directives[0]
            if script.upgrade_ops.is_empty():
                directives[:] = []
                logger.info('No changes in schema detected.')

    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        # Only attempt schema creation for non-SQLite databases
        if SCHEMA and connection.dialect.name != "sqlite":
            connection.execute(text(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA}"))

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            process_revision_directives=process_revision_directives,
            **current_app.extensions['migrate'].configure_args
        )

        with context.begin_transaction():
            context.run_migrations()


# Entry point
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
