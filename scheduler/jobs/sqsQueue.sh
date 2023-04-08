#!/usr/bin/env bash

curl http://web:3000/api/cron/sqsQueue -H "x-scheduler-key: $SCHEDULER_KEY"