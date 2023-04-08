FROM alpine:3.7

RUN apk add --update --no-cache \
    bash \
    curl \
    python3 \
    dos2unix \
    && ln -sf python3 /usr/bin/python

RUN python3 -m ensurepip --upgrade \
    && pip3 install --upgrade pip setuptools

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/scheduler

COPY jobs/*.* ./jobs/

COPY crontab.* ./
COPY start.sh .

RUN dos2unix crontab.* *.sh jobs/*.* \
    && find . -type f -iname "*.sh" -exec chmod +x {} \
    && find . -type f -iname "*.py" -exec chmod +x {} \;

RUN touch /var/log/cron.log

CMD ["./start.sh"]

