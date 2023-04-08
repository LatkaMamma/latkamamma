#!/usr/bin/env bash

if [ -z "$SCHEDULER_ENV" ]; then
    echo "No SCHEDULER_ENV set, defaulting to development."
    export SCHEDULER_ENV=development
fi

CRON_FILE="crontab.$SCHEDULER_ENV"

echo "loading crontab from $CRON_FILE..."

crontab "$CRON_FILE"

echo "starting cron..."

crond -f
