
FROM --platform=amd64 python:3.9.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

COPY ./start.sh .

CMD ["bash", "./start.sh"]
