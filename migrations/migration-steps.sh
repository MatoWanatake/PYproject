#!/bin/bash

# rm instance/dev.db
# rm migrations/versions/*
# flask db migrate -m "Generate Migrations For Models"

# Start Here
rm instance/dev.db
flask db upgrade
flask seed all