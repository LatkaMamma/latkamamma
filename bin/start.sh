#!/bin/bash

# Start the scheduler container and get its IP address
SCHEDULER_IP=$(docker compose up -d scheduler && docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' scheduler)

# Set the SCHEDULER_IP environment variable
export SCHEDULER_IP

# Start the remaining containers
docker compose up -d
