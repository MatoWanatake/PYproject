RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app
